$(function() {
  // penalty box tweets by screen name
  function removeByScreenName(name) {
    $('[data-screen-name="' + name + '"]').closest('.stream-item').penaltyBox();
  }

  // penalty box retweets by scree name
  function removeRetweetsByScreenName(name) {
    $('.tweet-meta em:containsExactly("by ' + name + '")').closest('.stream-item').penaltyBox();
  }

  // penalty box all tweets that mention the screen name
  function removeTweetsMentioningScreenName(name) {
    $('.tweet-text a.twitter-atreply[data-screen-name="' + name + '"]').closest('.stream-item').penaltyBox();
  }

  (function watcher() {
    setTimeout(function() {
      // Load
      //  TODO: implement this
      var penatly_box = ['users-go-here']

      // Remove
      _.each(penatly_box, function(name) {
        removeByScreenName(name);
        removeRetweetsByScreenName(name);
        removeTweetsMentioningScreenName(name);
      });
      // Recurse
      //  note: covers new tweets and infinite scroll
      watcher();
    }, 5000);
  })();
});
