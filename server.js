const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
// Set Handlebars.
const hbs = require("express-handlebars");

app.engine( 'handlebars', hbs( {
  extname: 'handlebars',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
} ) );
app.set("view engine", "handlebars");

let PORT = process.env.PORT || 8080;



// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public/assets"));


// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


// Routes
require("./routes/htmlroutes")(app);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
