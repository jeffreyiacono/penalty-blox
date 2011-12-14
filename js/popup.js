$(function() {
  // view - blocked entry
  window.BlockedEntryView = Backbone.View.extend({
    tagName: 'li',
    events: {
      'click .blocked-entry-destroy': 'clear'
    },

    initialize: function() {
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
    },

    render: function() {
      $(this.el).html(this.model.get('entry') + '<span class="blocked-entry-destroy">[x]</span>');
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
    el: $('#penalty-box-app'),
    events: {
      'click #add-blocked-entry'    : 'addBlockedEntry',
      'click #instructions-toggle'  : 'toggleInstructions',
      'keypress #new-blocked-entry' : 'createOnEnter'
    },

    initialize: function() {
      this.input = this.$('#new-blocked-entry');
      this.instructions = this.$('#controls .instructions');
      this.reminder = this.$('#entries .reminder');
      this.reminder.hide();
      BlockedEntries.bind('add', this.addOne, this);
      BlockedEntries.bind('reset', this.addAll, this);
      BlockedEntries.bind('all', this.render, this);
      BlockedEntries.fetch();
    },

    toggleInstructions: function(e) {
      e.preventDefault();
      var link = $(e.target);
      this.instructions.slideToggle('fast', function() {
        if($(this).is(':visible')) {
          link.text('[-] Hide Instructions');
        } else {
          link.text('[+] Show Instructions');
        }
      });
    },

    addOne: function(entry) {
      var view = new BlockedEntryView({model: entry});
      this.$('#penalty-box').prepend(view.render().el);
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
  window.App = new AppView;
});
