// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});


// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' class='form-control mt-3' name='title' placeholder='title'>");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' class='form-control mt-3' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote' class='btn btn-secondary mt-3'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});


$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      for (i=0;i<data.notes.length;i++){
        $("#notes").append(`
        <div class="notes-item mt-3">
        <h2>`+data.notes[i].title+`</h2>
        <p>`+data.notes[i].body+`</p>
        </div>
        `)
      }
      console.log(data);
     
    });
});


// When you click the savenote button



$(document).on('click', '#savenote', function () {
  var noteTitle = $("#titleinput");
  var noteBody = $("#bodyinput");
  var articleID = $("#savenote").attr("data-id");
  console.log(articleID);
  createNewNote(noteTitle.val().trim(), noteBody.val().trim(), articleID)
  noteTitle.val('');
  noteBody.val('');
  
})

// Passes the task title, description, and associated article id to the post.
function createNewNote(title, body, articleID) {
  $.post("/articles/note", {
    title: title,
    body: body,
    articleID: articleID
  }).then(function (data) {
    console.log(data);
    window.location.href = data
  })
}
