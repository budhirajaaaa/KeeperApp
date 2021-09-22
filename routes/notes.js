const router = require("express").Router();
const bodyParser = require("body-parser");
const Note = require("../model/note.model.js");
const https = require("https");

router.use(bodyParser.urlencoded({extended: true}));

router.route("/").get((req, res) => {
    Note.find()
    .then(notes => res.json(notes))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {

  console.log(req.body);
  const title =req.body.title;
  const content = req.body.content;

    const newNote = new Note({title,content});
    newNote.save()
        .then(() => res.send("new post added!"))
        .catch(err => res.status(400).json("Error: " + err));
    //console.log(newNote);
});


router.route("/:content").delete((req, res) => {
        console.log(req.params.content);
         Note.deleteOne({content: req.params.content})
        .then(() => res.send("successfully deleted"))
        .catch(err => res.status(400).json("Error: " + err));
});
module.exports = router;
