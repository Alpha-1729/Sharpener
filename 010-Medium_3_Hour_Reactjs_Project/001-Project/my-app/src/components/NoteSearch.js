import { useState, useContext, useRef } from "react";
import classes from './NoteSearch.module.css';
import NoteContext from "../store/note-context";

function NoteSearch({ onSearch }) {
    const [filteredCount, setFilteredCount] = useState(0);
    const noteCtx = useContext(NoteContext);
    const searchInputRef = useRef("");

    const notesCount = noteCtx.notes.length;

    const searchHandler = () => {
        const enteredValue = searchInputRef.current.value;

        const filteredNotes = enteredValue.trim() === ""
            ? noteCtx.notes
            : noteCtx.notes.filter(note =>
                note.title.toLowerCase().includes(enteredValue.toLowerCase()) ||
                note.description.toLowerCase().includes(enteredValue.toLowerCase())
            );


        setFilteredCount(filteredNotes.length);
        onSearch(filteredNotes);
    };

    return (
        <div className={classes.container}>
            <div className={classes.searchBox}>
                <label htmlFor="search">Search Note:</label>
                <input
                    type="text"
                    id="search"
                    ref={searchInputRef}
                    onChange={searchHandler}
                    placeholder="Search notes..."
                />
            </div>
            <div className={classes.infoBox}>
                <p>Total Notes: {notesCount}</p>
                <p>Showing: {filteredCount}</p>
            </div>
        </div>
    );
}

export default NoteSearch;
