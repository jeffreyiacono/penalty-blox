function Settings() {
  this._store = localStorage;
  this._key   = 'penalty_box_settings';
  // if empty, start with an empty array
  if (this._store.getItem(this._key) == null) {
    this._store.setItem(this._key, JSON.stringify([]));
  }
  return this;
}

Settings.prototype.includes = function(setting) {
  return _.include(this.getAll(), setting);
}

Settings.prototype.getAll = function() {
  return JSON.parse(this._store.getItem(this._key));
}

// not using Settings#includes intentionally b/c need getAll result at least, at most twice:
// save extra call to getAll when setting not currently included
// most likely will not be calling #set on setting that already exists
Settings.prototype.set = function(setting) {
  var current = this.getAll();
  if (!_.include(current, setting)) {
    current.push(setting);
    this._store.setItem(this._key, JSON.stringify(current));
  }
  return true;
}

Settings.prototype.remove = function(setting) {
  var current = this.getAll();
  if (_.include(current, setting)) {
    current.pop(_.indexOf(current, setting));
    this._store.setItem(this._key, JSON.stringify(current));
  }
  return true;
}
