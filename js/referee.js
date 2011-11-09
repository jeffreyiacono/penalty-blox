// Handle sending send offenders off to the box, they feel shame.
function Referee() { return this; }

// use background / extension messaging to bridge popup with localStore
// get all penalty boxed accounts and remove them
// TODO: eventually want to move storage to web-app
Referee.prototype.referee = function() {
  // save who we are
  var self = this;
  // get localstore data
  chrome.extension.sendRequest({method: "getPenaltyBox"}, function(response) {
    // remove by name, RTs, and mentions. TODO: add removal by hashtags
    _.each(response.penalty_box, function(twHandle) {
      self.removeByScreenName(twHandle);
      self.removeRetweetsByScreenName(twHandle);
      self.removeTweetsMentioningScreenName(twHandle);
    });
  });
}

// penalty box by the screen name
Referee.prototype.removeByScreenName = function(name) {
  $('[data-screen-name="' + name + '"]').closest('.stream-item').penaltyBox();
}

// penalty box any retweets by the screen name
Referee.prototype.removeRetweetsByScreenName = function(name) {
  $('.tweet-meta em:containsExactly("by ' + name + '")').closest('.stream-item').penaltyBox();
}

// penalty box any tweets that mention the screen name
Referee.prototype.removeTweetsMentioningScreenName = function(name) {
  $('.tweet-text a.twitter-atreply[data-screen-name="' + name + '"]').closest('.stream-item').penaltyBox();
}
