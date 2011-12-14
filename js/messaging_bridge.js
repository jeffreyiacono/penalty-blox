// Note: wanted to use backbone's models here, but they would not refresh
//       when new entry was added via the extension (unknown why).
//       For example: (assumes proper js files are included in the header)
//
//          var entries = new BlockedEntries;
//          entries.fetch();
//          entries.pluck('entry'); # => always returned the same
//                                       array, even if items had been
//                                       dynamically added during run time
// * Resorted to pulling directly from localStorage and parsing
// * Likely want to move storage to a web-app
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.method == "getPenaltyBox") {
    var entries = JSON.parse(localStorage['penalty_box']);
    sendResponse({
      penalty_box: _.map(entries, function(entry) { return entry.entry })
    });
  }
});
