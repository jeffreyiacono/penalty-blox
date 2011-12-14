// Handle sending offenders off to the box, they feel shame.
function Referee() { return this; }

// use background / extension messaging to bridge popup with localStore
// get all penalty boxed entries and remove them
// TODO: eventually want to move storage to web-app
Referee.prototype.referee = function() {
  // save who we are
  var self = this;
  // get localstore data
  chrome.extension.sendRequest({method: "getPenaltyBox"}, function(response) {
    // if entry starts with "#", remove tweets by hashtag
    // otherwise, remove by name, RTs, and mentions
    _.each(response.penalty_box, function(entry) {
      if (entry && entry.substr(0, 1) == "#") {
        self.removeTweetsWithHashtag(entry);
      } else {
        self.removeByScreenName(entry);
        self.removeRetweetsByScreenName(entry);
        self.removeTweetsMentioningScreenName(entry);
      }
    });
  });
}

// penalty box by the screen name
Referee.prototype.removeByScreenName = function(name) {
  $('[data-screen-name="' + name + '"]').closest('.stream-item').penaltyBox();
}

// penalty box any retweets by the screen name
Referee.prototype.removeRetweetsByScreenName = function(name) {
  $('.tweet-activity-retweets b:containsExactly("' + name + '")').closest('.stream-item').penaltyBox();
}

// penalty box any tweets that mention the screen name
Referee.prototype.removeTweetsMentioningScreenName = function(name) {
  $('.tweet-text a.twitter-atreply[data-screen-name="' + name + '"]').closest('.stream-item').penaltyBox();
}

// penalty box any tweets that contain a hashtag
Referee.prototype.removeTweetsWithHashtag = function(hashtag) {
  $('.tweet-text a.twitter-hashtag[title="' + hashtag + '"]').closest('.stream-item').penaltyBox();
}
