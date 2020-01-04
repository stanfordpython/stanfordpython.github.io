/* File: admissions.js
 * -------------------
 * Distribute enrollment codes to students.
 * 
 * Revision History: 
 * @psarin 2019-10-28 Removed W19 codes
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
    'psarin': 123456
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