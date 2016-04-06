var isLocal = document.location.hostname === ""; 

if (isLocal){
  var slides = 0;
} else {
  $.getJSON("res/slides.json", function(data) {
    console.log(data);
  });
}


var assignments = [
  {
    "num": 1,
    "title": "Cryptography",
    "links": [
      {
        "title": "Handout",
        "href": "#"
      },
      {
        "title": "Starter Code",
        "href": "#"
      }
    ]
  }
]

for (var i = 0; i < assignments.length; i++) {
  var assign = assignments[i];
  $('ul#assignments').append(
    $('<li>').append(
      $('<span>').attr('class', 'tab').append("Assignment #" + assign.num + ": " + assign.title)
    )
  );
  $links = $("<ul>");
  for (var j = 0; j < assign.links.length; j++) {
    link = assign.links[j];
    $links.append(
      $("<li>").append($('<a>').attr('href', link.href).text(link.title))  
    );
  }
  $('ul#assignments').append($links);

}
