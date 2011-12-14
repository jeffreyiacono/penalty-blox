// blocked entries collection
window.BlockedEntries = Backbone.Collection.extend({
  model: BlockedEntry,
  localStorage: new Store('penalty_box')
});
