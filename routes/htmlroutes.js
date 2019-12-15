
const axios = require("axios");
const cheerio = require("cheerio");
// Require all models
const db = require("../models");



module.exports = function(app) {


// A GET route for scraping the echoJS website
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://www.pcmag.com/best-tech-reviews").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    console.log(response)
    var $ = cheerio.load(response.data);
    // Now, we grab every h2 within an article tag, and do the following:
    $("div .article-deck").each(function(i, element) {
      // Save an empty result object
      let result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console

        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });
});




// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Article.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function(dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/note", function(req, res) {
  // Create a new note and pass the req.body to the entry
  
    let thisArticle = req.body.articleID;
    let thisNoteTitle = req.body.title;
    let thisNoteBody = req.body.body;
    let newNote = {
      title: thisNoteTitle,
      body: thisNoteBody,
    };
  db.Article.findOneAndUpdate({
    _id: thisArticle
  }, {
    $push: {
      notes: newNote
    }
  }).then(function () {
    res.send('/')
  })
  .catch(function(err) {
    // If an error occurred, send it to the client
    res.json(err);
  });

});

app.delete("/articles/:articleID/:noteID", function(req,res){
  console.log(req.params)
  let thisArticle = req.params.articleID;
  let thisNote = req.params.noteID
  db.Article.findOne({_id: thisArticle}, function (err, result) {
    result.notes.id(thisNote).remove();
    result.save();  

}).then(function (data){
  console.log(data);
  res.send("/")
});

});

app.get("/", function(req, res){
  db.Article.find({})
  .then(function(data) {
let obj = {
  articles:data
}
console.log(obj)
    res.render("index" , obj);
  })
  .catch(function(err) {
    // If an error occurred, send it to the client
    res.json(err);
  });
  
});

};