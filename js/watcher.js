var watcher = {
  throttle: 1000,
  interval_id: null,

  // fire referee on a set interval
  // note: new tweets and infinite scroll are handled
  // proxy 'this' to be the watcher
  watch: function() {
    this.interval_id = setInterval($.proxy(this.referee, this), this.throttle);
  },

  // clears the set interval and stops the refereeing
  // when user is not looking at the window / tab, no need to do work
  halt: function(interval_id) {
    clearInterval(this.interval_id);
  },

  // send offenders to the box, they feel shame.
  referee: function() {
    // remember who we are
    var self = this;
    // Load: use background / extension messaging to bridge popup with localStore
    // eventually want to move storage to web-app
    chrome.extension.sendRequest({method: "getPenaltyBox"}, function(response) {
      // Remove by name, RTs, and mentions. TODO: add removal by hashtags
      _.each(response.penalty_box, function(twHandle) {
        self.removeByScreenName(twHandle);
        self.removeRetweetsByScreenName(twHandle);
        self.removeTweetsMentioningScreenName(twHandle);
      });
    });
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
