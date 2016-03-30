/* File: admissions.js
 * -------------
 * Distribute enrollment codes to students
 */

$(document).ready(function() {
  /* HEY YOU!
   * These enrollment codes aren't secure.
   * Duh.
   * Do not steal another student's attendance code.
   * We will know (of course), and you'll get in trouble.
   * So don't do it.
   */
  var codes = {
    // Sample Codes
    'sredmond': 012345,

    // First round acceptance
    "aansong": 371402,
    "brahm": 332748,
    "bryanmcl": 75453,
    "christyg": 695467,
    "disaza": 702661,
    "divya": 939247,
    "dookeran": 821902,
    "drenz": 215451,
    "eburke3": 955746,
    "ekpene": 885569,
    "guillean": 231127,
    "jason0": 540541,
    "jmwebb": 579724,
    "jtaylor5": 680524,
    "jzlai": 592297,
    "kbement": 865696,
    "kxu2": 530715,
    "malikali": 133138,
    "mkogan17": 265332,
    "mprecup": 832538,
    "msriniva": 399823,
    "mtroute": 565585,
    "mvobejda": 607725,
    "osow": 892584,
    "rchan2": 804096,
    "shreyg19": 177775,
    "spkim": 312691,
    "thaas19": 494851,
    "tlanham": 129579,
    "yhindy": 529298,
    "yueli1": 952505

    // Second round acceptance
  }

  $("#search-form").submit(function(event) {
    var $output = $("#code")
    $output.text("Searching...");

    var $input = $("#sunet");
    var sunet = $input.val();
    if (!sunet) {
      $output.text("Please enter your SUNet ID...");
    } else {
      var code = codes[sunet];
      if (code === undefined) {
        $output.text("No enrollment code found for SUNet ID '" + sunet + "'.");
      } else {
        $output.text(sunet + "! Your enrollment code is " + code);
      }
    }
    

    // Stop the real form from submitting
    event.preventDefault();
  });
});