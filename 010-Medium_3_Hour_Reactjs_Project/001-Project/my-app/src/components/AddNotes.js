import { Fragment } from "react";
import classes from './AddNotes.module.css'

function AddNotes({ onAddNote }) {
    return <Fragment>
        <button onClick={onAddNote} className={classes['add-btn']}>Add New Note</button>
    </Fragment>
}

export default AddNotes;