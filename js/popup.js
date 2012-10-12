$(function() {
  // view - blocked entry
  window.BlockedEntryView = Backbone.View.extend({
    tagName: 'li',
    template: '#blocked-entry-item-template',
    events: {
      'click .blocked-entry-destroy': 'clear'
    },

    initialize: function() {
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
    },

    render: function() {
      var template = _.template($(this.template).html(), this.model.toJSON());
      $(this.el).html(template);
      return this;
    },

    remove: function() {
      $(this.el).remove();
    },

    clear: function() {
      this.model.destroy();
    }
  });

  // view - application
  window.AppView = Backbone.View.extend({
    el: '#penalty-box-app',
    events: {
      'click #add-blocked-entry'               : 'addBlockedEntry',
      'click #instructions-toggle'             : 'toggleInstructions',
      'keypress #new-blocked-entry'            : 'createOnEnter',
      'click #remove-promoted-tweets:checkbox' : 'toggleRemovePromoted'
    },

    initialize: function() {
      this.input          = $(this.el).find('#new-blocked-entry');
      this.instructions   = $(this.el).find('#controls .instructions');
      this.reminder       = $(this.el).find('#reminder');
      this.removePromoted = $(this.el).find('#remove-promoted-tweets');
      this.settings       = new Settings;
      this.setRemovePromotedControl(); // can this be handled with custom events?
      this.showCurrentVersion();
      this.reminder.hide();

      _.bindAll(this, 'addOne');

      BlockedEntries.bind('add', this.addOne, this);
      BlockedEntries.bind('reset', this.addAll, this);
      BlockedEntries.bind('all', this.render, this);
      BlockedEntries.fetch();
    },

    showCurrentVersion: function() {
      var self = this;
      $.getJSON('manifest.json', function(data) {
        $(self.el).find('#current-version').text('penalty-box-v' + data['version']);
      });
    },

    setRemovePromotedControl: function() {
      this.removePromoted.prop('checked', this.settings.wantsPromotedRemoved());
    },

    toggleInstructions: function(e) {
      e.preventDefault();

      var link = $(e.target),
          instructions;

      this.instructions.slideToggle('fast', function() {
        if ($(this).is(':visible')) {
          instructions = '[-] Hide Instructions';
        } else {
          instructions = '[+] Show Instructions';
        }
        link.text(instructions);
      });
    },

    toggleRemovePromoted: function(e) {
      if (this.removePromoted.is(':checked')) {
        this.settings.set('removePromoted');
      } else {
        this.settings.remove('removePromoted');
      }
      // show refresh reminder => twitter doesn't have focus if popup showing
      this.showRefreshReminder();
    },

    addOne: function(entry) {
      var view = new BlockedEntryView({model: entry});
      $(this.el).find('#penalty-box').prepend(view.render().el);
    },

    addAll: function() {
      BlockedEntries.each(this.addOne);
    },

    addBlockedEntry: function(e) {
      var entry = this.input.val();
      if(!entry) return;
      BlockedEntries.create({entry: entry});
      this.input.val('');
      // show refresh reminder => twitter doesn't have focus if popup showing
      this.showRefreshReminder();
    },

    showRefreshReminder: function() {
      this.reminder
        .html('<strong>Reminder:</strong> close this popup to see changes take effect')
        .addClass('highlight')
        .fadeIn('slow');
    },

    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      this.addBlockedEntry(e);
    }
  });

  window.BlockedEntries = new BlockedEntries;
  window.Application    = new AppView;
});
