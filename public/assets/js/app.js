// Grab the articles as a json
// $.getJSON("/articles", function(data) {
//   // For each one
//   console.log(data);
//   for (var i = 0; i < data.length; i++) {
//     // Display the apropos information on the page
//     console.log(data)
//     $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//   }
// });


// Whenever someone clicks a p tag
$(document).on("click", "li", function() {
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
      $("#notes").append(`<div id="note-input">
        <h2>${data.title}</h2>
           <input id='titleinput' class='form-control mt-3' name='title' placeholder='title'>
            <textarea id='bodyinput' class='form-control mt-3' name='body'></textarea>
            <button data-id='${data._id}' id='savenote' class='btn btn-secondary mt-3'>Save Note</button>
            </div>`)
      if (data.notes) {
        for (i=0;i<data.notes.length;i++){
          $("#note-input").append(`<div class="list-group mt-1">
          <div class="list-group-item">
          <h4>${data.notes[i].title}</h4>
          <p>${data.notes[i].body}</p>
          <button data-id='${data._id}'  note-id='${data.notes[i]._id}' id='delete-note' class='btn btn-danger mt-3'>Delete Note</button>
          </div>
          </div>
          `)
        }}
    });
  })




$(document).on("click", "li", function() {
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
    window.location.href = data
  })
}


$(document).on('click', '#delete-note', function () {
  let noteId = $("#delete-note").attr("note-id");
  var articleID = $("#delete-note").attr("data-id");
  console.log('articleid: '+articleID);
  console.log('noteid: '+noteId)
  deleteNote(articleID, noteId)
  

})




function deleteNote(articleID, noteId){
  
  $.ajax({
    url: `/articles/${articleID}/${noteId}`,
    type: 'DELETE',
    success: function(result) {
      window.location.href = result
        // Do something with the result
    }
  });
}

