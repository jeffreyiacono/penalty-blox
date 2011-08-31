$(function() {
  // view - blocked account
  window.BlockedAccountView = Backbone.View.extend({
    tagName: 'li',
    events: {
      'click .blocked-account-destroy': 'clear'
    },

    initialize: function() {
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
    },

    render: function() {
      $(this.el).html(this.model.get('tw_handle') + '<span class="blocked-account-destroy">[x]</span>');
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
      'click #add-blocked-account':    'addBlockedAccount',
      'click #instructions-toggle':    'toggleInstructions',
      'keypress #new-blocked-account': 'createOnEnter'
    },

    initialize: function() {
      this.input = this.$('#new-blocked-account');
      this.instructions = this.$('#controls .instructions');
      BlockedAccounts.bind('add', this.addOne, this);
      BlockedAccounts.bind('reset', this.addAll, this);
      BlockedAccounts.bind('all', this.render, this);
      BlockedAccounts.fetch();
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

    addOne: function(account) {
      var view = new BlockedAccountView({model: account});
      this.$('#penalty-box').prepend(view.render().el);
    },

    addAll: function() {
      BlockedAccounts.each(this.addOne);
    },

    addBlockedAccount: function(e) {
      var tw_handle = this.input.val();
      if(!tw_handle) return;
      BlockedAccounts.create({tw_handle: tw_handle});
      this.input.val('');
    },

    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      this.addBlockedAccount(e);
    }
  });

  window.BlockedAccounts = new BlockedAccounts;
  window.App = new AppView;
});
