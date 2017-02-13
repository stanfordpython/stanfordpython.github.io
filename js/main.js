/* File: main.js
 * -------------
 * Initialization and tab switching for CS41's home page.
 *
 * Revision history:
 * @sredmond 2017-02-13 removed unused code
 * @skleung  2015-??-?? created
 */

$(document).ready(function() {
  // Initialize varibles
  var $window = $(window);
  var $splashPage = $('.splash.page'); // The login page
  var $detailPage = $('.detail.page'); // The chatroom page

  $('#learn-more').click(function() {
    $splashPage.fadeOut();
    $detailPage.show();
  });

  // Fade the splash page out on key press.
  var ENTER_KEYCODE = 13;
  var SPACE_KEYCODE = 32;
  var RIGHT_ARROW_KEYCODE = 39;
  var DOWN_ARROW_KEYCODE = 40;
  $window.keyup(function(event) {
    if (event.keyCode === ENTER_KEYCODE ||
        event.keyCode === SPACE_KEYCODE ||
        event.keyCode === RIGHT_ARROW_KEYCODE ||
        event.keyCode === DOWN_ARROW_KEYCODE) {
      if ($splashPage.is(":visible")) {
        $splashPage.fadeOut('fast');
        $detailPage.show('fast');
      }
    }
  });

  /* Tab Switching */

  var DEFAULT_TAB_HASH = '#overview';

  var getTabFromHref = function(href) {
    return $('#navigation a[href="' + href + '"]');
  };

  // Switch to active tab on reload
  var hash = window.location.hash || DEFAULT_TAB_HASH;
  getTabFromHref(hash).tab('show');

  // Show content tabs on click
  $('#navigation a[data-toggle="tab"]').click(function (event) {
    var $tab = $(this);
    var currentlyActive = $tab.parent().hasClass('active');
    // We changed the active tab and have a history object
    if (!currentlyActive && window.history && window.history.pushState) {
      window.history.pushState(null, null, $tab.attr('href'));
    }
    event.preventDefault();
  });

  // Switch to the active tab when the browser jumps backwards in state.
  $window.on('popstate', function(event) {
    var hash = window.location.hash || DEFAULT_TAB_HASH;
    getTabFromHref(hash).tab('show');
  });
});