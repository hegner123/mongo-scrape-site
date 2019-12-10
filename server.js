var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var app = express();
// Set Handlebars.
var hbs = require("express-handlebars");

app.engine( 'handlebars', hbs( {
  extname: 'handlebars',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
} ) );
app.set("view engine", "handlebars");

var PORT = 8080;

// Initialize Express


// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public/assets"));


// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/homeworkMongoScrape", { useNewUrlParser: true });

// Routes
require("./routes/htmlRoutes")(app);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
