/* File: admissions.js
 * -------------------
 * Distribute enrollment codes to students.
 *
 * Revision History:
 * @psarin 2020-01-06 Added first iteration of W20 codes
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
    'psarin': 123456,
    'anshal': 639854,
    'autumnluna': 225789,
    'avidesh': 431914,
    'cmoffitt': 536442,
    'emarx1': 613690,
    'lindseye': 529038,
    'mateoae': 327533,
    'mtekgurl': 732530,
    'mpike27': 989505,
    'iogalle': 41911,
    'emily2h': 802961,
    'rose2': 51555,
    'mdqin': 539304,
    'josencf': 590397,
    'deirdre3': 440287,
    'rubensan': 874424,
    'jinal': 295808,
    'nathgoh': 300496,
    'monaavr': 247830,
    'cperez8': 752226,
    'danielmq': 560811,
    'dannydu': 360101,
    'brianc42': 590364,
    'gsheen': 386784,
    'k99397': 635338,
    'helenav': 32052,
    'jaynavar': 842329,
    'anhtle': 578728,
    'echoe720': 20971,
    'elizfitz': 622331,
    'nicole01': 252812,
    'erickha': 88074,
    'jmgeller': 823690,
    'leilimor': 248053,
    'lilyjune': 536445,
    'snhoward': 861422,
    'aaseev': 915641,
    'yaronks': 587698,
    'jgilb': 960223,
    'ftarke': 819289,
    'joshuaoj': 46502,
    'ajarno': 75229,
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
        $output.text("No enrollment code found yet for SUNet ID '" + sunet + "'. Have you sent your introduction email to Michael and Parth?");
      } else {
        $output.text("Hello " + sunet + ": your enrollment code is " + code + ". Welcome to CS41! 🦄");
      }
    }

    // Stop the real form from submitting
    event.preventDefault();
  });
});
