const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");


const app =express();
app.use(cors());


app.use(express.static("public"));




mongoose.connect("mongodb+srv://admin-budhiraja:test123@cluster0.tmm0w.mongodb.net/notesDB", {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established");
});


const notesRouter = require("./routes/notes")
app.use("/posts", notesRouter);

if ( process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(process.env.PORT||"5000", function() {

  console.log("ser working");
});
