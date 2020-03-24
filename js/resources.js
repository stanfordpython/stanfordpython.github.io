/* File: resources.js
 * ------------------
 * Load resources into the CS41 content page.
 *
 * Revision history:
 * @psarin 2019-10-28 They don't need animated slides...
 * @sredmond  2016-??-?? Created
 */

/**
* Function that tracks a click on an outbound link in Analytics.
* This function takes a valid URL string as an argument, and uses that URL string
* as the event label. Setting the transport method to 'beacon' lets the hit be sent
* using 'navigator.sendBeacon' in browsers that support it.
*/
var trackOutboundLink = function(url) {
   ga('send', 'event', 'outbound', 'click', url, {
     'transport': 'beacon',
     'hitCallback': function(){document.location = url;}
   });
}

function create_optional_note(note, backup) {
    if (note === undefined || note === "#") {
        return backup;
    }

    return ' (' + note + ')';
}

function create_anchor(href, title, backup, tracker) {
  // No outgoing link, so just replace it with whatever the backup text is
  if (href === '#') {
    return $('<span>').append(backup);
  }

  // Otherwise, build an anchor tag around the given information
  var $anchor = $('<a>').attr('href', href).attr('target', '_blank').append(title);
  $anchor.click(function() {
    tracker(href);
    return true;  // Do take the default click action.
  });
  return $anchor;
}

function create_lab_tr(lab) {
  /*
  <tr>
    <th scope="row">1</th>
    <td><a href=...>Part 1</a></td>
    <td><a href=...>Part 2</a></td>
    <td><a href=...>Solutions</a></td>
  </tr>
  */
  if (!lab.visible) return null;

  var $tr = $('<tr>').append(
    $('<th>').attr('scope', 'row').append(lab.week)
  ).append(
    $('<td>').append(lab.topic)
  ).append(
    $('<td>').append(
      create_anchor(lab.part1, "Part 1", "None", gtag_trackLabHandout)
    )
  ).append(
    $('<td>').append(
      create_anchor(lab.part2, "Part 2", "None", gtag_trackLabHandout)
    )
  ).append(
    $('<td>').append(
      create_anchor(lab.solutions, "Solutions", "Unreleased", gtag_trackLabSolution)
    )
  );

  if (lab.active) {
    $tr.addClass('success');
  }
  return $tr;
}

function create_assignment_tr(assn) {
  /*
  <tr>
    <th scope="row">1</th>
    <td><a href=...>README</a></td>
    <td><a href=...>Starter Code</a></td>
    <td>Released</td>
    <td>Due</td>
  </tr>
  */
  if (!assn.visible) return null;

  var released = moment(assn.released, "YYYY-MM-DD");
  var due = moment(assn.due, "YYYY-MM-DD hh:mm:ss A").endOf('day');
  var releasedf = released.format('ddd MMM Do');
  var duef = due.format('ddd MMM Do [at] h:mm A') + ' (' + due.fromNow() + ')';

  var $tr = $('<tr>').append(
    $('<th>').attr('scope', 'row').append(assn.num)
  ).append(
    $('<td>').append(assn.title)
  ).append(
    $('<td>').append(
      create_anchor(assn.spec, "README", "No Spec", gtag_trackAssignmentHandout)
    )
  ).append(
    $('<td>').append(
      create_anchor(assn.starter_code, "Starter Code", "None", gtag_trackAssignmentStarterCode)
    )
  ).append(
    $('<td>').append(releasedf)
  ).append(
    $('<td>').append(duef)
  );
  if (assn.active) {
    $tr.addClass('success');
  }
  return $tr;
}

function create_lecture_tr(lecture) {
  /*
  <tr>
    <th scope="row">Title</th>
    <td><a href=...>Slides</a></td>
    <td><a href=...>Video</a> (Video Note)</td>
  </tr>
  */
  if (!lecture.visible) return null;

  var $tr = $('<tr>').append(
    $('<th>').attr('scope', 'row').append(lecture.title)
  ).append(
    $('<td>').append(
      create_anchor(lecture.condensed, "condensed", "N/A", gtag_trackLectureCondensed)
    ).append(' / ').append(
      create_anchor(lecture.full, "full", "N/A", gtag_trackLectureFull)
    )

  ).append(
    $('<td>').append(
      create_anchor(lecture.code, "code", "Currently Unavailable", gtag_trackLectureCode)
    )
  ).append(
    $('<td>').append(
      create_anchor(lecture.video, "video", "Currently Unavailable", gtag_trackLectureVideo)
    ).append(
      create_optional_note(lecture.video_note, '')
    )
  );

  if (lecture.active) {
    $tr.addClass('success');
  }
  return $tr;
}

function create_reading_tr(reading) {
  /*
  <tr>
    <th scope="row">Title</th>
    <td><a href=...>Slides</a></td>
    <td><a href=...>Video</a></td>
  </tr>
  */
  if (!reading.visible) return null;

  var $tr = $('<tr>').append(
    $('<th>').attr('scope', 'row').append(reading.num)
  ).append(
    $('<td>').append(
      create_anchor(reading.href, reading.title, "None", gtag_trackResourceReading)
    )
  ).append(
    $('<td>').append(reading.credit)
  );

  if (lecture.active) {
    $tr.addClass('success');
  }
  return $tr;
}

function create_handout_tr(ho) {
  /*
  <tr>
    <th scope="row">Title</th>
    <td><a href=...>Slides</a></td>
    <td><a href=...>Video</a></td>
  </tr>
  */
  if (!ho.visible) return null;

  var $tr = $('<tr>').append(
    $('<th>').attr('scope', 'row').append(ho.num)
  ).append(
    $('<td>').append(
      create_anchor(ho.href, ho.title, "None", gtag_trackResourceHandout)
    )
  );

  if (ho.active) {
    $tr.addClass('success');
  }
  return $tr;
}

function create_showcase_tr(project) {
  /*
  <tr>
    <td scope="row"> 
      <b>Sample Project Title</b> <br> 
         Sample Project Authors <br>
         <a href="link_to_project"> [Check it Out!] </a>
       </td>
    <td> (Image, if applicable) </td>
  </tr>
  */
  var $tr = $('<tr>').append(
    $('<td>').append(
    // $('<center>').attr('scope', 'row').append(
    $('<b>').append(
      project.title.concat("<br>"))).append(
      project.authors.concat("<br>")).append(
        create_anchor(project.readmeLink, "README", "None", gtag_trackShowcaseLink)
      ));
  $tr.append($("<br>").append(
        create_anchor(project.codeLink, project.codeSource, "None", gtag_trackShowcaseLink)
      ));

  // Add images if they're applicable
  if (project.img.length > 0){
    $tr.append(
      $('<td>').append(
        '<img src="'.concat(project.img, width="200", height="100", '"">')
      ));
  }
  else {
    // Occupy the right hand column with something.
    $tr.append(
      $('<td>').append(
        project.ext
      ));
  }
  console.log($tr)
  return $tr;
}

function create_announcement(announcement) {
  /*
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">Panel title</h3>
    </div>
    <div class="panel-body">
      Panel content
    </div>
    <div class="panel-footer">Panel footer</div>
  </div>
  */
  if (!announcement.visible) return null;

  var date = moment(announcement.date);

  var $panel = $('<div>').addClass('panel panel-default').append(
    $('<div>').addClass('panel-heading').append(
      $('<h2>').addClass('panel-title').append(announcement.title)
    ).append(
      $('<small>').append(date.fromNow())
    )
  ).append(
    $('<div>').addClass('panel-body').append(announcement.content)
  );
  return $panel;
}

function create_day_markup(day) {
  /*
  */
  return $('<div>').addClass('day').append(
    $('<div>').append(
      $('<strong>').addClass('text-success').append(day.title + " ")
    ).append(
      $('<small>').addClass('text-muted').append(day.date)
    )
  ).append(
    $('<div>').append(day.description)
  );
}

function create_week_heading_tr(week) {
  /*
  <tr>
    <td colspan=3>title</td>
  </tr>
  */
  if (!week.visible) return null;

  var monday = week.days[0];
  var wednesday = week.days[1];

  var start = new Date(week.dates.start);
  var end = new Date(week.dates.end);
  var startf = (start.getMonth() + 1) + '/' + (start.getDate() + 1);
  var endf = (end.getMonth() + 1) + '/' + (end.getDate() + 1);

  var $tr = $('<tr>').append(
    $('<td>').append(
      $('<strong>').addClass('text-primary').append("Week " + week.num)
    ).append(
      $('<div>').append(startf).append(' to ').append(endf)
    )
  );
  var $monday = $('<td>').append(
    create_day_markup(monday)
  );
  if (monday.active) {
    $monday.addClass('success');
  }
  var $wednesday = $('<td>').append(
    create_day_markup(wednesday)
  );
  if (wednesday.active) {
    $wednesday.addClass('success');
  }
  return $tr.append($monday).append($wednesday);
}

// Actually fetch all the resources
var RESOURCES_DIR = 'http://localhost:8000/res'

$.when(
  // Before we can do anything, make sure we have the proper data!
  $.getJSON(RESOURCES_DIR + '/announcements.json', function(data) {
      announcements = data;
  }),
  $.getJSON(RESOURCES_DIR + '/assignments.json', function(data) {
      assignments = data;
  }),
  $.getJSON(RESOURCES_DIR + '/handouts.json', function(data) {
      handouts = data.sort((a,b) => (a.num > b.num) ? 1 : -1);
  }),
  $.getJSON(RESOURCES_DIR + '/labs.json', function(data) {
      labs = data;
  }),
  $.getJSON(RESOURCES_DIR + '/lectures.json', function(data) {
      lectures = data;
  }),
  $.getJSON(RESOURCES_DIR + '/readings.json', function(data) {
      readings = data.sort((a,b) => (a.num > b.num) ? 1 : -1);
  }),
  $.getJSON(RESOURCES_DIR + '/schedule.json', function(data) {
      schedule = data;
  }),
  $.getJSON(RESOURCES_DIR + '/projects.json', function(data) {
      projects = data;
  })
).then(function() {

  for (var i = 0; i < labs.length; i++) {
    var lab = labs[i];
    var markup = create_lab_tr(lab);
    if (markup !== null) {
      $(".labs tbody").append(markup);
    }
  }

  for (var i = 0; i < assignments.length; i++) {
    var assn = assignments[i];
    var markup = create_assignment_tr(assn);
    if (markup !== null) {
      $(".assignments tbody").append(markup);
    }
  }

  for (var i = 0; i < lectures.length; i++) {
    var lec = lectures[i];
    var markup = create_lecture_tr(lec);
    if (markup !== null) {
      $(".lectures tbody").append(markup);
    }
  }

  for (var i = 0; i < readings.length; i++) {
    var reading = readings[i];
    var markup = create_reading_tr(reading);
    if (markup !== null) {
      $(".readings tbody").append(markup);
    }
  }

  for (var i = 0; i < handouts.length; i++) {
    var ho = handouts[i];
    var markup = create_handout_tr(ho);
    if (markup !== null) {
      $(".handouts tbody").append(markup);
    }
  }

  for (var i = 0; i < projects.length; i++) {
    var proj = projects[i];
    var markup = create_showcase_tr(proj);
    if (markup !== null) {
      $(".projects tbody").append(markup);
    }
  }

  for (var i = 0; i < schedule.length; i++) {
    var week = schedule[i];
    var markup = create_week_heading_tr(week);
    if (markup != null) {
      $(".schedule tbody").append(markup);
    }
  }

  for (var i = 0; i < announcements.length; i++) {
    var announcement = announcements[i];
    var markup = create_announcement(announcement);
    if (markup != null) {
      $("#announcements").append(markup)
    }
    days = week.days
    for (var j = 0; j < days.length; j++) {
      var day = days[j];
    }
  }
});
