// penaltyBox: fade node out, then remove
//
// usage: $('.some-class').penaltyBox();
jQuery.fn.penaltyBox = function() {
  $(this).fadeOut('slow', function() { $(this).remove(); });
}

// Exactly match, case insensitive
//
// usage: $('div:containsExactly("some text")')
jQuery.expr[":"].containsExactly = function(obj, index, meta, stack) {
  return ($(obj).text() || "").toLowerCase() == meta[3].toLowerCase();
}
