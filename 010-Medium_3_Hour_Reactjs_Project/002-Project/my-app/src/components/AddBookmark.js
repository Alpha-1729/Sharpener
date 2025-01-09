import { Fragment } from "react";
import classes from './AddBookmark.module.css';

function AddBookmark({ onAddBookmark }) {
    return (
        <Fragment>
            <div className={classes['add-btn-container']}>
                <button onClick={onAddBookmark} className={classes['add-btn']}>
                    Add New
                </button>
            </div>
        </Fragment>
    );
}

export default AddBookmark;
