// blocked accounts collection
window.BlockedAccounts = Backbone.Collection.extend({
  model: BlockedAccount,
  localStorage: new Store('penalty_box')
});
