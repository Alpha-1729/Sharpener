import { useRef, useEffect } from "react";
import styles from "./AddBookmarkModal.module.css";

function AddBookmarkModal({ onClose, onAddBookmark, initialBookmark }) {
  const titleRef = useRef("");
  const bookmarkRef = useRef("");

  useEffect(() => {
    if (initialBookmark) {
      titleRef.current.value = initialBookmark.title;
      bookmarkRef.current.value = initialBookmark.link;
    }
  }, [initialBookmark]);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const newBookmark = {
      ...(initialBookmark && { _id: initialBookmark._id }),
      title: titleRef.current.value,
      link: bookmarkRef.current.value,
    };

    titleRef.current.value = "";
    bookmarkRef.current.value = "";
    await onAddBookmark(newBookmark);
  };

  return (
    <>
      <div className={styles.backdrop} onClick={onClose}></div>
      <div className={styles.modal}>
        <h2>{initialBookmark ? "Edit Bookmark" : "Add Bookmark"}</h2>
        <form onSubmit={formSubmitHandler}>
          <div className={styles.field}>
            <label htmlFor="bookmarkTitle">Title:</label>
            <input
              id="bookmarkTitle"
              type="text"
              ref={titleRef}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="bookmarkLink">Link:</label>
            <input
              id="bookmarkLink"
              type="text"
              ref={bookmarkRef}
              required
            />
          </div>
          <div className={styles.actions}>
            <button type="submit">{initialBookmark ? "Save" : "Add"}</button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddBookmarkModal;
