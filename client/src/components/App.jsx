import React, { useState,useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios"
 

function App() {
  const [notes, setNotes] = useState([]);
  function addNote(newNote) {
    console.log("submit");
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }


  useEffect(() => {
         axios.get("/posts/")
         .then (res => {
             setNotes(res.data);
         })
         .catch(err => {
             console.log(err);
         })
     });



  function deleteNote(id ,content) {
    const con = content;
    //console.log(con);
    axios.delete('/posts/' + con);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
