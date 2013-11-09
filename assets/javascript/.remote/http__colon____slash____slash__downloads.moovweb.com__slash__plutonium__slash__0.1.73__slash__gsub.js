/* Ruby style gsub / Sean Jezewski
 * * * * * * * * * 
 */

function single_split(big_string, delimiter) {
  var lower_boundary = big_string.indexOf(delimiter);
  var upper_boundary = lower_boundary + delimiter.length;
  return [big_string.substr(0, lower_boundary), big_string.substr(upper_boundary, big_string.length-1)];
}

function gsub(input, matcher, replace) {
  if(input === undefined) {
    // For example, applying passthrough to an attribute that doesn't exist
    // TODO: check to make sure downstream effects are ok
    console.error("gsub -- empty input:", arguments);
    return null;
  }
  if (matcher == "") {
    return input;
  }

  var captures = {};
  var match_data = null; 
  var head = "";
  var tail = input;
  var match = "";
  var is_string = (typeof(matcher) == 'string');

  var apply_matcher = function(tail) { return matcher.exec(tail); }

  if (is_string) {
    apply_matcher = function(tail) { return (tail.indexOf(matcher) == -1) ? null : [matcher];}
  }

  var counter = 0;

  //  while(match_data = matcher.exec(tail)) {
  while(match_data = apply_matcher(tail) ) {
    counter += 1;

    if(counter == 100) {
      return;
    }

    match = match_data[0];
    var parts = single_split(tail, match);

    head += parts[0];
    tail = parts[1];

    if(is_string) {
      head += replace;
    } else {

      x$().iterate(
        match_data,
        function(capture, index) {
          if (index == 0) {
            return;
          }
          captures[String(index)] = capture;
        }
      );

      // This is silly -- JS supports captures, but not yielding, so to support global replace w captures, I need implement it myself

      // Start replace string setup
      var head_replace_string = "";
      var tail_replace_string = replace;

      while(replace_data = /[\$\\]([\d])/.exec(tail_replace_string)) {
        var replacement_parts = single_split(tail_replace_string, replace_data[0]);

        head_replace_string += replacement_parts[0];
        tail_replace_string = replacement_parts[1];
        
        head_replace_string += captures[replace_data[1]];      
      }

      if(tail_replace_string.length > 0) {
        head_replace_string += tail_replace_string;
      }

      // End replace string setup

      head += head_replace_string;

    }

  }

  if(tail.length > 0) {
    head += tail;
  }

  return head;
}
