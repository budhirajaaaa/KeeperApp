const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title:{type:String},
  content:{type:String}
});

const Note = new mongoose.model("Note",noteSchema);

module.exports=Note;
