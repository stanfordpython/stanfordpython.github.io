/* File: admissions.js
 * -------------------
 * Distribute enrollment codes to students.
 * 
 * Revision History: 
 * @sredmond 2017-02-13 Removed S16 codes
 * @sredmond 2016-??-?? Created
 */

$(document).ready(function() {
  /* Hey there!
   * These enrollment codes aren't secure. Perhaps obviously.
   * 
   * Do not steal another student's attendance code.
   * We will know, and you'll get in trouble. So don't do it.
   */
  var codes = {
    // Sample Codes
    'sredmond': 123456,

    'tyhong': 448278,
    'lemuel': 213073,
    'jsparmar': 342447,
    'mfinkels': 822141,
    'tculhane': 739267,
    'avanikan': 645525,
    'antoniof': 452821,
    'sofij': 594149,
    'smullane': 576808,
    'jlintott': 767978,
    'tyjack': 942088,
    'Tomgold': 190237,
    'psarin': 305837,
    'yanqiu': 574499,
    'gsamp': 383783,
    'mradhak': 812814,
    'meara': 24335,
    'aristos': 444974,
    'slowenst': 330363,
    'tnollman': 232838,

    'ekim67': 475410,
    'wang1227': 213163,
    'germans': 247689,
    'aramire9': 891029,
    'tankevin': 465277,
    'oukm': 796978,
    'sander12': 883547,
    'css19': 458150,
    'hahntrn': 201487,
    'awvry952': 841287,
    // Insert other enrollment codes below.

    // These people don't know they're in yet.
    'jeportil': 552046,
    'cynthiaj': 652553,
    'walecka': 898217,
    'jwha23': 613710,
    'aapellan': 174830,
    'trinaldo': 944306,
    'emilyw12': 147514,
    'maxperko': 304550,
    'zhengl': 283574,
    'suihong': 615000,
    'gcheng21': 529782,
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
        $output.text("No enrollment code found yet for SUNet ID '" + sunet + "'.");
      } else {
        $output.text("Hello " + sunet + ": your enrollment code is " + code + ". Welcome to CS41!");
      }
    }

    // Stop the real form from submitting
    event.preventDefault();
  });
});