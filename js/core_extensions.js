// penaltyBox: fade node out, then remove
//
// usage: $('.some-class').penaltyBox();
jQuery.fn.penaltyBox = function() {
  $(this).fadeOut('slow', function() { $(this).remove(); });
}

// exactly match, case insensitive
jQuery.expr[":"].containsExactly = function(obj, index, meta, stack) {
  return ($(obj).text() || "").toLowerCase() == meta[3].toLowerCase();
}

// extend jQuery to allow for regex selectors
// via: http://james.padolsey.com/javascript/regex-selector-for-jquery/
jQuery.expr[':'].regex = function(elem, index, match) {
  var matchParams = match[3].split(','),
      validLabels = /^(data|css):/,
      attr = {
        method: matchParams[0].match(validLabels) ? matchParams[0].split(':')[0] : 'attr',
        property: matchParams.shift().replace(validLabels,'')
      },
      regexFlags = 'ig',
      regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
  return regex.test(jQuery(elem)[attr.method](attr.property));
}
