/**
 * In general, following along from.
 * https://support.google.com/analytics/topic/1726910
 *
 * This script assumes that gtag has been sourced using the default snippet.
 * 
 *
 * We track the following categories of events:
 *   outbound links
 *     click application link from splash page
 *     click application link from alert
 *     click application link from course info page
 *     click on a link to lecture slides
 *     click on a link to lab materials
 *     click on a link to assignment materials
 *     click on a link to resource materials
 *     click on a link to course info, syllabus, piazza
 *   internal links
 *     navigate to a different tab panel
 *     click through the splash screen
 *     navigating to weird pages
 *       iamhere.stanfordpython.com
 *       stanfordpython.com/admissions.html
 *       stanfordpython.com/archive.html
 * 
 */

var GA_TRACKING_ID = "UA-54146031-2";

// Setting the transport method to 'beacon' lets the hit be sent
// using 'navigator.sendBeacon' in browser that support it.
var DEFAULT_TRANSPORT_TYPE = 'beacon';

// Track a click event in Analytics.
var trackClickLinkEvent = function(category, label, url, external) {
  var params = {
    'event_category': 'outbound',
    'event_label': url,
    'transport_type': DEFAULT_TRANSPORT_TYPE,
    'event_callback': function(){document.location = url;}
  };
  gtag('event', 'click', params);
}

var gtag_trackTabPaneToggle = function(url) {
  gtag('event', 'click', {
    'event_category': 'tab',
    'event_label': url,
    'transport_type': DEFAULT_TRANSPORT_TYPE,
  });
  // Update the page_path of the configuration details to point to a virtual page.
  gtag('config', GA_TRACKING_ID, {'page_path': '/virtual/' + url});
  console.log('Tracking navigation to ' + url);
}

var trackApplicationLink = function(source) {

}

var trackCondensedLectureLink = function(url) {

}

/**
* Function that tracks a click on an outbound link in Analytics.
* This function takes a valid URL string as an argument, and uses that URL string
* as the event label. 
*/
var gtag_trackOutboundLink = function(url, external) {
  params = {

  }
  gtag('event', 'click', {
    'event_category': 'outbound',
    'event_label': url,
    'transport_type': DEFAULT_TRANSPORT_TYPE,
    'event_callback': function(){document.location = url;}
  });
}
