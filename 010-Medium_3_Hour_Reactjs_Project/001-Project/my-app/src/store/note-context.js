import React from "react";

const NoteContext = React.createContext({
    notes: [],
    addNote: (note) => {},
    removeNote: (id) => {}
});

export default NoteContext;
