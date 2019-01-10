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

    'ekim67': 'Coming soon.',
    'wang1227': 'Coming soon.',
    'germans': 'Coming soon.',
    'aramire9': 'Coming soon.',
    'tankevin': 'Coming soon.',
    'oukm': 'Coming soon.',
    'sander12': 'Coming soon.',
    'css19': 'Coming soon.',
    'hahntrn': 'Coming soon.',
    'awvry952': 'Coming soon.',
    // Insert other enrollment codes below.
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