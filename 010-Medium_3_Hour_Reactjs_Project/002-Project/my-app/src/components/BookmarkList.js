import React from "react";
import classes from "./BookmarkList.module.css";

function BookmarkList({ bookmarks, onDelete, onEdit }) {
  const heading = <h2>Bookmarks</h2>;
  if (bookmarks.length === 0) {
    return (
      <div className={classes.bookmarkList}>
        {heading}
        <p>No bookmarks available.</p>
      </div>
    );
  }

  return (
    <div className={classes.bookmarkList}>
      {heading}
      <ul>
        {bookmarks.map(({ _id, title, link }) => (
          <li key={_id} className={classes.bookmarkItem}>
            <div className={classes.bookmarkContent}>
              <h3>{title}</h3>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </div>
            <div className={classes.actions}>
              <button
                className={classes.editButton}
                onClick={() => onEdit(_id)}
              >
                Edit
              </button>
              <button
                className={classes.deleteButton}
                onClick={() => onDelete(_id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookmarkList;
