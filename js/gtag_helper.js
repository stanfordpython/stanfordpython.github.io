/**
 * In general, following along from.
 * https://support.google.com/analytics/topic/1726910
 *
 * This script assumes that gtag has been sourced using the default snippet.
 * 
 *
 * We track the following categories of events:
 *   outbound links
 *     click application link from splash page DONE
 *     click application link from alert DONE
 *     click application link from course info page DONE
 *     click on a link to lecture slides or video
 *     click on a link to lab materials
 *     click on a link to assignment materials
 *     click on a link to resource materials
 *     click on a link to course info, syllabus, piazza
 *   internal links
 *     navigate to a different tab panel DONE
 *     click through the splash screen DONE
 *     navigating to weird pages
 *       iamhere.stanfordpython.com IMPOSSIBLE?
 *       stanfordpython.com/admissions.html DONE
 *       stanfordpython.com/archive.html DONE
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
  console.log('gtag_trackTabPaneToggle');
  // Update the page_path of the configuration details to point to a virtual page.
  gtag('config', GA_TRACKING_ID, {'page_path': '/virtual/' + url});
  gtag('event', 'click', {
    'event_category': 'tab',
    'event_label': url,
    'transport_type': DEFAULT_TRANSPORT_TYPE,
  });
  // console.log('Tracking navigation to ' + url);
}

var gtag_trackLectureCondensed = function(url) {
  console.log('trackLectureCondensed');
  gtag('event', 'click', {
    'event_category': 'lecture:condensed',
    'event_label': url,
    'transport_type': DEFAULT_TRANSPORT_TYPE,
    // 'event_callback': function(){document.location = url;}
  });
}

var gtag_trackLectureFull = function(url) {
  console.log('trackLectureFull');
  gtag('event', 'click', {
    'event_category': 'lecture:full',
    'event_label': url,
    'transport_type': DEFAULT_TRANSPORT_TYPE,
    // 'event_callback': function(){document.location = url;}
  });
}

var gtag_trackLectureVideo = function(url) {
  console.log('trackLectureVideo');
  gtag('event', 'click', {
    'event_category': 'lecture:video',
    'event_label': url,
    'transport_type': DEFAULT_TRANSPORT_TYPE,
    // 'event_callback': function(){document.location = url;}
  });
}

var gtag_trackLabHandout = function(url) {
  console.log('trackLabHandout');
  gtag('event', 'click', {
    'event_category': 'lab:handout',
    'event_label': url,
    'transport_type': DEFAULT_TRANSPORT_TYPE,
    // 'event_callback': function(){document.location = url;}
  });
}

var gtag_trackLabSolution = function(url) {
  console.log('trackLabSolution');
  gtag('event', 'click', {
    'event_category': 'lab:solution',
    'event_label': url,
    'transport_type': DEFAULT_TRANSPORT_TYPE,
    // 'event_callback': function(){document.location = url;}
  });
}

var gtag_trackAssignmentHandout = function(url) {
  console.log('trackAssignmentHandout');
  gtag('event', 'click', {
    'event_category': 'assignment:handout',
    'event_label': url,
    'transport_type': DEFAULT_TRANSPORT_TYPE,
    // 'event_callback': function(){document.location = url;}
  });
}

var gtag_trackAssignmentStarterCode = function(url) {
  console.log('trackAssignmentStarterCode');
  gtag('event', 'click', {
    'event_category': 'assignment:starter_code',
    'event_label': url,
    'transport_type': DEFAULT_TRANSPORT_TYPE,
    // 'event_callback': function(){document.location = url;}
  });
}

var gtag_trackResourceHandout = function(url) {
  console.log('trackResourceHandout');
  gtag('event', 'click', {
    'event_category': 'resource:handout',
    'event_label': url,
    'transport_type': DEFAULT_TRANSPORT_TYPE,
    // 'event_callback': function(){document.location = url;}
  });
}

var gtag_trackResourceReading = function(url) {
  console.log('trackResourceReading');
  gtag('event', 'click', {
    'event_category': 'resource:reading',
    'event_label': url,
    'transport_type': DEFAULT_TRANSPORT_TYPE,
    // 'event_callback': function(){document.location = url;}
  });
}



var gtag_trackSplashPageClickthrough = function() {
  console.log('gtag_trackSplashPageClickthrough');
  gtag('event', 'click', {
    'event_category': 'splash',
    'event_label': '#',
    'transport_type': DEFAULT_TRANSPORT_TYPE,
  });
}

var gtag_trackApplication = function(source) {
  console.log('gtag_trackApplication');
  gtag('event', 'click', {
    'event_category': 'application',
    'event_label': source,
    'transport_type': DEFAULT_TRANSPORT_TYPE,
    // 'event_callback': function(){document.location = url;}
  });
}

/**
* Function that tracks a click on an outbound link in Analytics.
* This function takes a valid URL string as an argument, and uses that URL string
* as the event label. 
*/
var gtag_trackOutboundLink = function(url) {
  gtag('event', 'click', {
    'event_category': 'outbound',
    'event_label': url,
    'transport_type': DEFAULT_TRANSPORT_TYPE,
    // 'event_callback': function(){document.location = url;}
  });
}
