/**
 * In general, trying to track these messages.
 * https://support.google.com/analytics/topic/1726910
 */
// <script>
/**
* Function that tracks a click on an outbound link in Analytics.
* This function takes a valid URL string as an argument, and uses that URL string
* as the event label. Setting the transport method to 'beacon' lets the hit be sent
* using 'navigator.sendBeacon' in browser that support it.
*/
var gtag_trackOutboundLink = function(url) {
  console.log('Tracking outbound link.');
  gtag('event', 'click', {
    'event_category': 'outbound',
    'event_label': url,
    'transport_type': 'beacon',
    'event_callback': function(){document.location = url;}
  });
}
// </script>