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

let PORT = $PORT;

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
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });


// Routes
require("./routes/htmlroutes")(app);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
