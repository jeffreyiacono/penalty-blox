var monitor = {
  interval: 1000,

  init: function() {
    // proxy 'this' to be the monitor
    setTimeout($.proxy(this.referee, this), this.interval);
  },

  // make sure offenders are sent to the box. They feel shame.
  referee: function() {
    // remember know who you are
    var self = this;
    // Load: use background / extension messaging to bridge popup with localStore
    // eventually want to move storage to web-app
    chrome.extension.sendRequest({method: "getPenaltyBox"}, function(response) {
      // Remove by name, RTs, and mentions
      _.each(response.penalty_box, function(twHandle) {
        self.removeByScreenName(twHandle);
        self.removeRetweetsByScreenName(twHandle);
        self.removeTweetsMentioningScreenName(twHandle);
      });
    });
    // Recurse: covers new tweets and infinite scroll
    self.init();
  },

  // penalty box by the screen name
  removeByScreenName: function(name) {
    $('[data-screen-name="' + name + '"]').closest('.stream-item').penaltyBox();
  },

  // penalty box any retweets by the screen name
  removeRetweetsByScreenName: function(name) {
    $('.tweet-meta em:containsExactly("by ' + name + '")').closest('.stream-item').penaltyBox();
  },

  // penalty box any tweets that mention the screen name
  removeTweetsMentioningScreenName: function(name) {
    $('.tweet-text a.twitter-atreply[data-screen-name="' + name + '"]').closest('.stream-item').penaltyBox();
  }
};
