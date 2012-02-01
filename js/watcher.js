/**
 *  Watcher responsible for watching / halting the referee
 *  Requried referee param must implement #referee method
 */
function Watcher(referee) {
  this._throttle    = 1000;
  this._interval_id = null;
  this._referee     = referee;
  return this;
}

/**
 *  fire _referee on set "this.throttle" intervals
 *  proxy this._referee.referee to this._referee, otherwise lose scope
 *  note: set interval to handle new tweets and infinite scroll
 */
Watcher.prototype.watch = function() {
  this._interval_id = window.setInterval($.proxy(this._referee.referee, this._referee), this._throttle);
}

/** clear the set interval (stops the refereeing) **/
Watcher.prototype.halt = function() {
  clearInterval(this._interval_id);
}
