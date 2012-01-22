// preferences collection
window.Preferences = Backbone.Collection.extend({
  model: Preference,
  localStorage: new Store('penalty_box_preferences')
});
