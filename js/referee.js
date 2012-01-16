// Handle sending offenders off to the box, they feel shame.
function Referee() { return this; }

/** 
 * use background / extension messaging to bridge popup with localStore
 * get all penalty boxed entries and remove them
 * TODO: eventually want to move storage to web-app
 */
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
        self.removeTweetsByUser(entry);
        self.removeRetweetsByUser(entry);
        self.removeMentionsOfUser(entry);
      }
    });
  });
}
/** 
 *  penalty box any tweets by a given user
 *  @param name can be either the user's twitter handle or profile name
 *  note: assumes "new twitter" html structure
 */
Referee.prototype.removeTweetsByUser = function(name) {
  $('.stream-item-header .username b:containsExactly("' + name + '")').closest('.stream-item').penaltyBox();
  $('.stream-item-header .fullname:containsExactly("' + name + '")').closest('.stream-item').penaltyBox();
}
/** 
 *  penalty box any retweets by a given user
 *  @param name can be either the user's twitter handle or profile name
 *  note: assumes "new twitter" html structure
 */
Referee.prototype.removeRetweetsByUser = function(name) {
  $('.stream-item-footer b:containsExactly("' + name + '")').closest('.stream-item').penaltyBox();
  $('.stream-item-footer a.js-user-profile-link[href$="/' + name +'"]').closest('.stream-item').penaltyBox();
}
/** 
 *  penalty box any mentions of a given user
 *  @param name can be either the user's twitter handle or profile name
 *  note: assumes "new twitter" html structure
 */
Referee.prototype.removeMentionsOfUser = function(name) {
  $('.js-tweet-text a.twitter-atreply[data-screen-name="' + name + '"]').closest('.stream-item').penaltyBox();
}
/** 
 * penalty box tweets with a given hashtag
 * @param hashtag can be any string in the from '#' + string
 */
Referee.prototype.removeTweetsWithHashtag = function(hashtag) {
  $('.js-tweet-text a.twitter-hashtag[title="' + hashtag + '"]').closest('.stream-item').penaltyBox();
}
