// function extentions
jQuery.extend(jQuery.fn, {
  /**
   * penaltyBox: fade node out, then remove
   * usage: $('.some-class').penaltyBox();
   */
  penaltyBox: function() {
    jQuery(this).fadeOut('slow', function() { jQuery(this).remove(); });
  },

  tweet: function() {
    return jQuery(this).closest('.stream-item');
  }
});

// expression extentions
jQuery.extend(jQuery.expr[":"], {
  /**
   * exactly match, case insensitive
   * usage: $('div:containsExactly("some text")')
   * note: assumes "new twitter" html structure
   */
  containsExactly: function(obj, index, meta, stack) {
    return (jQuery(obj).text() || "").toLowerCase() == meta[3].toLowerCase();
  }
});
