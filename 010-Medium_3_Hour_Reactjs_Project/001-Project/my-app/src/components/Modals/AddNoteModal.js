import { useContext, useRef } from "react";
import styles from "./AddNoteModal.module.css";
import NoteContext from "../../store/note-context";

function AddNoteModal({ onClose }) {
    const titleRef = useRef("");
    const descRef = useRef("");

    const noteCtx = useContext(NoteContext);

    const formSubmitHandler = (event) => {
        event.preventDefault();
        const newNote = {
            id: Math.random().toString(),
            title: titleRef.current.value,
            description: descRef.current.value,
        };

        titleRef.current.value = "";
        descRef.current.value = "";

        noteCtx.addNote(newNote);
        onClose();
    };

    return (
        <>

            <div className={styles.backdrop} onClick={onClose}></div>
            <div className={styles.modal}>
                <h2>Add Note</h2>
                <form onSubmit={formSubmitHandler}>
                    <div className={styles.field}>
                        <label htmlFor="noteTitle">Title:</label>
                        <input
                            id="noteTitle"
                            type="text"
                            // value={noteTitle}
                            ref={titleRef}
                            // onChange={(e) => setNoteTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="noteDesc">Description:</label>
                        <textarea
                            id="noteDesc"
                            // value={noteDesc}
                            ref={descRef}
                            // onChange={(e) => setNoteDesc(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className={styles.actions}>
                        <button type="submit">Add</button>
                        <button type="button" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddNoteModal;
