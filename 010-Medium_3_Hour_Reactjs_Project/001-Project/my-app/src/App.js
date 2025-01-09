import React, { useState, useContext, useEffect, useCallback } from "react";
import NoteSearch from "./components/NoteSearch";
import NoteList from "./components/NoteList";
import NoteHeading from "./components/NoteHeading";
import NoteContext from "./store/note-context";
import NoteProvider from "./store/NoteProvider";
import AddNotes from "./components/AddNotes";
import AddNoteModal from "./components/Modals/AddNoteModal";

function App() {
  const noteCtx = useContext(NoteContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState(noteCtx.notes);
  useEffect(() => {
    setFilteredNotes(noteCtx.notes);
  }, [noteCtx.notes]);

  const openModalHandler = () => setIsModalOpen(true);
  const closeModalHandler = () => setIsModalOpen(false);

  const searchHandler = useCallback((filteredNotes) => {
    setFilteredNotes(filteredNotes);
  }, []);

  const deleteHandler = (id) => {
    noteCtx.removeNote(id);
    setFilteredNotes((prevFiltered) =>
      prevFiltered.filter((note) => note.id !== id)
    );
  };

  const handleAddNote = (newNote) => {
    noteCtx.addNote(newNote); // Add the note to the context

    closeModalHandler(); // Close the modal after adding the note
    setFilteredNotes(noteCtx.notes);
  };

  return (
    <NoteProvider>
      <NoteHeading />
      <NoteSearch onSearch={searchHandler} />
      <AddNotes onAddNote={openModalHandler} />
      {isModalOpen && (
        <AddNoteModal
          onClose={closeModalHandler}
          onAddNote={handleAddNote}
        />
      )}
      <NoteList notes={filteredNotes} onDelete={deleteHandler} />
    </NoteProvider>
  );
}


export default App;
