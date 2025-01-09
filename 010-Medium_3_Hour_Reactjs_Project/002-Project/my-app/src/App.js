import React, { useState, useContext, useEffect, useCallback, Fragment } from "react";
import axios from "axios";
import BookmarkHeading from "./components/BookmarkHeading";
import AddBookmark from './components/AddBookmark';
import BookmarkContext from "./store/bookmark-context.js";
import AddBookmarkModal from './components/Modals/AddBookmarkModal.js';
import BookmarkList from './components/BookmarkList.js';

const apiUrl = "https://crudcrud.com/api/97fa5a68ad1842b4ae71d9c45b3498d9/bookmarks";

function App() {
  const bookmarkCtx = useContext(BookmarkContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState(null);

  const handleApiError = (error, message) => {
    console.error(message, error);
    alert(message);
  };

  const fetchBookmarks = useCallback(async () => {
    if (bookmarkCtx.bookmarks.length === 0) {
      try {
        const response = await axios.get(apiUrl);
        bookmarkCtx.setBookmarks(response.data);
      } catch (error) {
        handleApiError(error, "Error loading bookmarks:");
      }
    }
  }, [bookmarkCtx]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  const openModalHandler = () => setIsModalOpen(true);
  const closeModalHandler = () => setIsModalOpen(false);

  const deleteHandler = useCallback(async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      bookmarkCtx.removeBookmark(id);
    } catch (error) {
      handleApiError(error, "Error deleting bookmark:");
    }
  }, [bookmarkCtx]);

  const editHandler = (id) => {
    const bookmarkToEdit = bookmarkCtx.bookmarks.find((bookmark) => bookmark._id === id);
    setEditingBookmark(bookmarkToEdit);
    openModalHandler();
  };

  const handleAddBookmark = useCallback(async (newBookmark) => {
    try {
      if (editingBookmark) {
        await axios.put(`${apiUrl}/${newBookmark._id}`, newBookmark);
        bookmarkCtx.updateBookmark(newBookmark);
      } else {
        const response = await axios.post(apiUrl, newBookmark);
        newBookmark._id = response.data._id;
        bookmarkCtx.addBookmark(newBookmark);
      }
      closeModalHandler();
      setEditingBookmark(null);
    } catch (error) {
      handleApiError(error, "Error saving bookmark:");
    }
  }, [editingBookmark, bookmarkCtx]);

  return (
    <Fragment>
      <BookmarkHeading />
      <AddBookmark onAddBookmark={openModalHandler} />
      {isModalOpen && (
        <AddBookmarkModal
          onClose={closeModalHandler}
          onAddBookmark={handleAddBookmark}
          initialBookmark={editingBookmark}
        />
      )}
      <BookmarkList
        bookmarks={bookmarkCtx.bookmarks}
        onDelete={deleteHandler}
        onEdit={editHandler}
      />
    </Fragment>
  );
}

export default App;
