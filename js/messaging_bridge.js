/**
 * Messaging bridge to return popup's localstorage entry and settings data
 *
 * Note: wanted to use backbone's models here, but would not refresh
 *       when new entry was added via the extension (unknown why).
 *       For example: (assumes proper js files are included in the header)
 *
 *          var entries = new BlockedEntries;
 *          entries.fetch();
 *          entries.pluck('entry'); # => always returned the same
 *                                       array, even if items had been
 *                                       dynamically added during run time
 *
 * Resorted to pulling directly from localStorage and parsing
 * Likely want to move storage to a web-app at some point
 */
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.method == "getDataFromPopup") {
    var entries  = JSON.parse(localStorage['penalty_box']);
    var settings = JSON.parse(localStorage['penalty_box_settings']);

    sendResponse({
      penalty_box: _.map(entries, function(entry) { return entry.entry }),
         settings: settings
    });
  }
});
