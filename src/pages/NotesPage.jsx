import React from "react";
import Notecard from "../components/NotesCard.jsx";
import { dummyData as notes } from "../assets/dummyData.js";

const NotesPage = () => {
  return (
    <div>
      {notes.map((note) => {
        return <Notecard key={note.$id} note={note} />;
      })}
    </div>
  );
};

export default NotesPage;
