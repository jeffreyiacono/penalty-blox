// function extentions
jQuery.extend(jQuery.fn, {
  /**
   * penaltyBox: fade node out, then remove
   * usage: $('.some-class').penaltyBox();
   */
  penaltyBox: function() {
    jQuery(this).fadeOut('slow', function() { jQuery(this).remove(); });
  }
});

// expression extentions
jQuery.extend(jQuery.expr[":"], {
  /**
   * exactly match, case insensitive
   * usage: $('div:containsExactly("some text")')
   * note: assumes "new twitter" html structure
   */
  containsExactly: function(obj, index, meta, stack) {
    return (jQuery(obj).text() || "").toLowerCase() == meta[3].toLowerCase();
  },

  /**
   * matches tweets based on full name
   * usage: $('.stream-item:tweetByUsername("some-name"')
   * note: assumes "new twitter" html structure
   */
  tweetByUsername: function(obj, index, meta, stack) {
    return (jQuery(obj).find('.stream-item-header .username b').text() || "").toLowerCase() == meta[3].toLowerCase();
  },

  /**
   * matches tweets based on full name
   * usage: $('.stream-item:tweetByFullname("Some Name"')
   * note: assumes "new twitter" html structure
   */
  tweetByFullname: function(obj, index, meta, stack) {
    return (jQuery(obj).find('.stream-item-header .fullname').text() || "").toLowerCase() == meta[3].toLowerCase();
  },

  /**
   * matches RT based on user name
   * usage: $('.stream-item:tweetByUsername("some-name"')
   * note: assumes "new twitter" html structure
   */
  retweetByUsername: function(obj, index, meta, stack) {
    return jQuery(obj).find('.stream-item-footer b:containsExactly("' + meta[3] + '")').length > 0
  },

  /**
   * matches RT based on full name
   * usage: $('.stream-item:retweetByFullname("Some Name"')
   * note: assumes "new twitter" html structure
   */
  retweetByFullname: function(obj, index, meta, stack) {
    return jQuery(obj).find('.stream-item-footer a.js-user-profile-link[href$="/' + meta[3] +'"]').length > 0
  },

  /**
   * matches tweets that mention a username
   * usage: $('.stream-item:mentionsUsername("some-name"')
   * note: assumes "new twitter" html structure
   */
  mentionsUsername: function(obj, index, meta, stack) {
    return jQuery(obj).find('.js-tweet-text a.twitter-atreply[data-screen-name="' + meta[3] + '"]').length > 0
  },

  /**
   * matches tweets that include a hashtag
   * usage: $('.stream-item:includesHashtag("#some-hashtag"')
   */
  includesHashtag: function(obj, index, meta, stack) {
    return jQuery(obj).find('.js-tweet-text a.twitter-hashtag[title="' + meta[3] + '"]').length > 0
  },

  /**
  * matches promoted tweets
  * usage: $('.stream-item:promotedTweet')
  */
  promotedTweet: function(obj, index, meta, stack) {
    return jQuery(obj).find('a.js-action-profile-promoted').length > 0
  }
});
