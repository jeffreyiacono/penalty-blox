// Handle sending offenders off to the box where they will feel shame.
function Referee() {
  return this;
}

/** 
 * use background / extension messaging to bridge popup with localStore
 * get all penalty boxed entries and remove them along with settings
 *
 * TODO: eventually want to move storage to web-app
 */
Referee.prototype.referee = function() {
  // save who we are for scope-keeping later
  var self = this;
  // get penalty boxed entries from popup's localstore data
  // if entry starts with "#", remove tweets by hashtag
  // otherwise remove by name, RTs, and mentions
  chrome.extension.sendRequest({method: "getPenaltyBox"}, function(response) {
    _.each(response.penalty_box, function(entry) {
      if (entry && entry.substr(0, 1) == "#") {
        self.removeTweetsWithHashtag(entry);
      } else {
        self.removeTweetsByUser(entry);
        self.removeRetweetsByUser(entry);
        self.removeMentionsOfUser(entry);
      }
    });
  });

  // get settings from popup's localstore data, apply corresponding
  // functionality for each
  chrome.extension.sendRequest({method: "getSettings"}, function(response) {
    _.each(response.settings, function(setting) {
      switch (setting) {
        case "removePromoted": self.removePromotedTweets(); break;
      }
    });
  });
}
/**
 *  penalty box any tweets by a given user
 *  @param name can be either the user's twitter handle or profile name
 */
Referee.prototype.removeTweetsByUser = function(name) {
  $('.stream-item:tweetByUsername("' + name + '")').penaltyBox();
  $('.stream-item:tweetByFullname("' + name + '")').penaltyBox();
}
/**
 *  penalty box any retweets by a given user
 *  @param name can be either the user's twitter handle or profile name
 */
Referee.prototype.removeRetweetsByUser = function(name) {
  $('.stream-item:retweetByUsername("' + name + '")').penaltyBox();
  $('.stream-item:retweetByFullname("' + name + '")').penaltyBox();
}
/**
 *  penalty box any mentions of a given user
 *  @param name can be either the user's twitter handle or profile name
 */
Referee.prototype.removeMentionsOfUser = function(name) {
  $('.stream-item:mentionsUsername("' + name + '")').penaltyBox();
}
/**
 * penalty box tweets with a given hashtag
 * @param hashtag can be any string in the from '#' + string
 */
Referee.prototype.removeTweetsWithHashtag = function(hashtag) {
  $('.stream-item:includesHashtag("' + hashtag + '")').penaltyBox();
}
/** penalty box promoted tweets */
Referee.prototype.removePromotedTweets = function() {
  $('.stream-item:promotedTweet').penaltyBox();
}
