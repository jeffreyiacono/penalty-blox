$(function() {
  // window becomes active, user is looking => fire it up!
  $(window).focus(function() {
    watcher.watch();
  });

  // window becomes inactive, user is not looking at the window / tab => shut it down
  $(window).blur(function(e) {
    watcher.halt();
  });

  // initiate the Referee
  var referee = new Referee();
  // initiate the Watcher
  var watcher = new Watcher(referee);
  // start watching
  watcher.watch();
});
