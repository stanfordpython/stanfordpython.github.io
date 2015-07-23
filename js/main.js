// Initialize varibles
var $window = $(window);
var $usernameInput = $('.usernameInput'); // Input for username
var $messages = $('.messages'); // Messages area
var $inputMessage = $('.inputMessage'); // Input message input box

var $splashPage = $('.splash.page'); // The login page
var $detailPage = $('.detail.page'); // The chatroom page

$('#learn-more').click(function() {
  console.log("yo");
  $splashPage.fadeOut();
  $detailPage.show();
})