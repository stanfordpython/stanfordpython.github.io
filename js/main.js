/* File: main.js
 * -------------
 * Initialization code for the main page
 */

$(document).ready(function() {
  // Initialize varibles
  var $window = $(window);
  var $usernameInput = $('.usernameInput'); // Input for username
  var $messages = $('.messages'); // Messages area
  var $inputMessage = $('.inputMessage'); // Input message input box

  var $splashPage = $('.splash.page'); // The login page
  var $detailPage = $('.detail.page'); // The chatroom page   

  $('#learn-more').click(function() {
    $splashPage.fadeOut();
    $detailPage.show();
  });

  $window.keyup(function(e) {
    if (e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 40 || e.keyCode === 39) {
      if ($splashPage.is(":visible")) {
        $splashPage.fadeOut();
        $detailPage.show();
      }
    }
  });

  $('#navigation a[data-toggle="tab"]').click(function (e) {
    $(this).tab('show');
    e.preventDefault();
  })

  // TODO: better tab switching!

  // Switch to active tab on reload
  if (window.location.hash !== '') {
    $('#navigation a[href="' + window.location.hash + '"]').tab('show');
  }

  // Add hash to URL and push to browser history
  $('#navigation a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
     if(history.pushState) {
          history.pushState(null, null, '#' + $(e.target).attr('href').substr(1));
     } else {
          window.location.hash = '#' + $(e.target).attr('href').substr(1);
     }
  });
});

// Switch to the active tab when the browser jumps backwards in state.
$(window).on('popstate', function() {
  if (window.location.hash !== '') {
    $('#navigation a[href="' + window.location.hash + '"]').tab('show');
  }
});