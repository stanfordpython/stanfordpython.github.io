/* File: admissions.js
 * -------------------
 * Distribute lab assignments to students.
 *
 * Revision History:
 * @coopermj 1-14-2020 Created the file.
 */

$(document).ready(function() {
  var codes = {
    'coopermj': 'Parth',
    'cmoffitt': 'Alex',
    'anhtle': 'Andrew',
    'ftarke': 'Andrew',
    'helenav': 'Andrew',
    'iogalle': 'Andrew',
    'jmgeller': 'Andrew',
    'monaavr': 'Andrew',
    'nathgoh': 'Andrew',
    'aaseev': 'Antonio',
    'avidesh': 'Antonio',
    'elizfitz': 'Antonio',
    'erickha': 'Antonio',
    'gsheen': 'Antonio',
    'mateoae': 'Antonio',
    'rubensan': 'Antonio',
    'cperez8': 'Antonio',
    'emarx1': 'Sam',
    'k99397': 'Sam',
    'emily2h': 'Sam',
    'jinal': 'Sam',
    'josencf': 'Sam',
    'joshuaoj': 'Sam',
    'leilimor': 'Sam',
    'ajarno': 'Sam',
    'snhoward': 'Sam',
    'jcorbin': 'Theo',
    'jgilb': 'Theo',
    'lindseye': 'Theo',
    'mdqin': 'Theo',
    'mpike27': 'Theo',
    'yaronks': 'Theo',
    'dylanly9': 'Theo',
    'nicole01': 'Theo',
    'danielmq': 'Zheng',
    'dannydu': 'Zheng',
    'deirdre3': 'Zheng',
    'echoe720': 'Zheng',
    'lilyjune': 'Zheng',
    'rose2': 'Zheng',
    'nbuday': 'Zheng',
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
        $output.text("No assigned TA found for SUNet ID '" + sunet + "'. Please send Michael or Parth an email or make a priavte Piazza post.");
      } else {
        $output.text("Hello " + sunet + "! Your assigned lab TA is " + code + "! Have a blast in lab!");
      }
    }

    // Stop the real form from submitting
    event.preventDefault();
  });
});
