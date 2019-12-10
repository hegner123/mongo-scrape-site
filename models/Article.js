var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  // `title` is of type String
  title: {
    type:String,
    required:true
  },
  // `body` is of type String
  body: String
});

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({

  title: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  },

  notes: [NoteSchema]

});


var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
