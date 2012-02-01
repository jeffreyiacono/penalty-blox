$(function() {
  // window becomes active, user is looking => fire it up!
  $(window).focus(function() {
    watcher.watch();
  });

  // window becomes inactive, user is not looking at the window / tab => shut it down
  $(window).blur(function(e) {
    watcher.halt();
  });

  // initiate the Referee, Watcher, and have Watcher start watching
  var referee = new Referee(),
      watcher = new Watcher(referee);

  watcher.watch();
});
