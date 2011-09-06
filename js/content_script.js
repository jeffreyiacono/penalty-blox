$(function() {
  // window becomes active => fire it up!
  $(window).focus(function() {
    watcher.watch();
  });

  // window becomes inactive => shut it down
  $(window).blur(function(e) {
    watcher.halt();
  });

  // initiate the watcher's watching
  watcher.watch();
});
