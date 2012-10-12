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
  /**
   * make one call to the messaging bridge to get the penaltyboxed entries and
   * the current settings from popup's localstore data.
   * If entry starts with "#", remove tweets by hashtag,
   * otherwise remove by name, RTs, and mentions.
   *
   * For settings, respond appropriately based on current elections
   */
  chrome.extension.sendMessage({method: "getDataFromPopup"}, function(response) {
    // Grab the home stream, pass as param => being reused over and over, so cache
    // it once and reuse it.
    var stream = $('.stream-items');
    // penalty box
    _.each(response.penalty_box, function(entry) {
      if (entry && entry.substr(0, 1) == "#") {
        self.removeTweetsWithHashtag(entry, stream);
      } else {
        self.removeTweetsByUser(entry, stream);
        self.removeRetweetsByUser(entry, stream);
        self.removeAtMentionsOfUser(entry, stream);
      }
    });

    // settings
    _.each(response.settings, function(setting) {
      switch (setting) {
        case "removePromoted": self.removePromotedTweets(stream); break;
      }
    });
  });
}

/**
 *  penalty box any tweets by a given user
 *  @param name can be either the user's twitter handle or profile name
 *  @param stream is the id of twitters html stream node
 *  note: assumes "new twitter" html structure
 */
Referee.prototype.removeTweetsByUser = function(name, stream) {
  stream.find('.stream-item-header .username b:containsExactly("' + name + '")').tweet().penaltyBox();
  stream.find('.stream-item-header strong.fullname:containsExactly("' + name + '")').tweet().penaltyBox();
}

/**
 *  penalty box any retweets by a given user
 *  @param name can be either the user's twitter handle or profile name
 *  @param stream is the id of twitters html stream node
 *  note: assumes "new twitter" html structure
 */
Referee.prototype.removeRetweetsByUser = function(name, stream) {
  stream.find('.stream-item-footer b:containsExactly("' + name + '")').tweet().penaltyBox();
  stream.find('.stream-item-footer a.js-user-profile-link[href$="/' + name +'"]').tweet().penaltyBox();
}

/**
 *  penalty box any mentions of a given user
 *  @param name can be either the user's twitter handle or profile name
 *  @param stream is the id of twitters html stream node
 *  note: assumes "new twitter" html structure
 */
Referee.prototype.removeAtMentionsOfUser = function(name, stream) {
  stream.find('.js-tweet-text a.twitter-atreply b:containsExactly("' + name + '")').tweet().penaltyBox();
}

/**
 * penalty box tweets with a given hashtag
 * @param hashtag can be any string in the from '#' + string
 * @param stream is the id of twitters html stream node
 * note: for strings that start with "#" we check the DOM for the string
 * proceeding the "#" ... TW currently splits the "#" + "[string]" into
 * different DOM elements.
 */
Referee.prototype.removeTweetsWithHashtag = function(hashtag, stream) {
  stream.find('.js-tweet-text a.twitter-hashtag b:containsExactly("' + hashtag.substr(1, hashtag.length - 1) + '")').tweet().penaltyBox();
}

/**
 * penalty box promoted tweets
 * @param stream is the id of twitters html stream node
 */
Referee.prototype.removePromotedTweets = function(stream) {
  stream.find('a.js-action-profile-promoted').tweet().penaltyBox();
}
