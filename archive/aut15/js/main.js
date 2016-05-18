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

$(window).keyup(function(e) {
  if (e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 40 || e.keyCode === 39) {
    if ($splashPage.is(":visible")) {
      $splashPage.fadeOut();
      $detailPage.show();
    }
  }
});