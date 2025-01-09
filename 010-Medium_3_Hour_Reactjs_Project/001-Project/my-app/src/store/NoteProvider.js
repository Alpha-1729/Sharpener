import React, { useReducer } from "react";
import NoteContext from "./note-context";

const defaultNoteState = {
	notes: [],
};

const noteReducer = (state, action) => {
	switch (action.type) {
		case 'ADD':
			{
				const updatedNotes = state.notes.concat(action.note);
				return {
					notes: updatedNotes
				};
			}
		case 'REMOVE':
			{
				const updatedNotes = state.notes.filter(note => note.id !== action.id);
				return {
					notes: updatedNotes,
				};
			}
		default:
			return defaultNoteState;
	}

};

function NoteProvider(props) {
	const [noteState, dispatchNoteAction] = useReducer(noteReducer, defaultNoteState);

	const addNoteHandler = (note) => {
		dispatchNoteAction({ type: 'ADD', note: note });
	};

	const removeNoteHandler = (id) => {
		dispatchNoteAction({ type: 'REMOVE', id: id });
	};

	const noteContext = {
		notes: noteState.notes,
		addNote: addNoteHandler,
		removeNote: removeNoteHandler,
	};

	return (
		<NoteContext.Provider value={noteContext}>
			{props.children}
		</NoteContext.Provider>
	);
}

export default NoteProvider;