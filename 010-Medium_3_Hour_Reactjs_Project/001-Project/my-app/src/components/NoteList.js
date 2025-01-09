import React from "react";
import classes from "./NoteList.module.css";

function NoteList({ notes, onDelete }) {
  if (notes.length === 0) {
    return (
      <div className={classes.noteList}>
        <h2>All Notes</h2>
        <p>No notes available.</p>
      </div>
    );
  }

  // Render the list of notes
  return (
    <div className={classes.noteList}>
      <h2>All Notes</h2>
      <ul>
        {notes.map(({ id, title, description }) => (
          <li key={id} className={classes.noteItem}>
            <div className={classes.noteContent}>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            <button
              className={classes.deleteButton}
              onClick={() => onDelete(id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
