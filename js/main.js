/* File: main.js
 * -------------
 * Initialization and tab switching for CS41's home page.
 *
 * Revision history:
 * @sredmond 2017-02-13 Removed unused code
 * @skleung  2015-??-?? Created
 */

$(document).ready(function() {
  var $window = $(window);

  /* Splash Page */

  // Whether to force users through a splash page.
  // Set to true at the start of the quarter, during applications.
  // Set to false during the quarter.
  var SHOW_SPLASH_PAGE = true;

  // Keycodes to leave the splash page.
  var ENTER_KEYCODE = 13;
  var SPACE_KEYCODE = 32;
  var RIGHT_ARROW_KEYCODE = 39;
  var DOWN_ARROW_KEYCODE = 40;

  var $splashPage = $('.splash.page'); // Splash page w/ link to application
  var $contentPage = $('.content.page'); // Main course content 
  
  if (SHOW_SPLASH_PAGE) {
    $contentPage.hide();

    // Hide the splash page and show the content page.
    var showContent = function() {
      if ($splashPage.is(":visible")) {
        $contentPage.show(/* duration_ms = */ 100, function() {
          // Only when the content page finishes showing, fade out
          $splashPage.fadeOut();
        });
        gtag_trackSplashPageClickthrough();
      }
    }
    
    // Show the content page when a user clicks the learn-more button.
    $('#learn-more').click(showContent);
    
    // Show the content page when a user hits any of the following keys.
    $window.keyup(function(event) {
      if (event.keyCode === ENTER_KEYCODE ||
          event.keyCode === SPACE_KEYCODE ||
          event.keyCode === RIGHT_ARROW_KEYCODE ||
          event.keyCode === DOWN_ARROW_KEYCODE) {
        showContent()
      }
    });
  } else {
    $splashPage.hide()
  }

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
    var href = $tab.attr('href');href
    if (!currentlyActive) {
      gtag_trackTabPaneToggle(href);
    }

    // We changed the active tab and have a history object
    if (!currentlyActive && window.history && window.history.pushState) {
      window.history.pushState(null, null, href);
    }
    event.preventDefault();
  });

  // Switch to the active tab when the browser jumps backwards in state.
  $window.on('popstate', function(event) {
    var hash = window.location.hash || DEFAULT_TAB_HASH;
    getTabFromHref(hash).tab('show');
  });
});