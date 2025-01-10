import React, { useState, useContext, useEffect, useCallback, Fragment } from "react";
import axios from "axios";
import BookmarkHeading from "./components/BookmarkHeading";
import AddBookmark from './components/AddBookmark';
import BookmarkContext from "./store/bookmark-context.js";
import AddBookmarkModal from './components/Modals/AddBookmarkModal.js';
import BookmarkList from './components/BookmarkList.js';

const apiUrl = "https://crudcrud.com/api/81773e9d1a30448eb2850fc75782ed52/bookmarks";

function App() {
  const bookmarkCtx = useContext(BookmarkContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);


  const fetchBookmarks = useCallback(async () => {
    if (!isDataFetched) {
      try {
        const response = await axios.get(apiUrl);
        bookmarkCtx.setBookmarks(response.data);
        setIsDataFetched(true);
      } catch (error) {
        alert();
      }
    }
  }, [bookmarkCtx, isDataFetched]);

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
      alert();
    }
  }, [bookmarkCtx]);

  const editHandler = (id) => {
    const bookmarkToEdit = bookmarkCtx.bookmarks.find((bookmark) => bookmark._id === id);
    setEditingBookmark(bookmarkToEdit);
    openModalHandler();
  };

  const handleAddBookmark = useCallback(async (newBookmark, id) => {
    console.log(newBookmark);
    try {
      if (editingBookmark) {
        await axios.put(`${apiUrl}/${newBookmark._id}`, {
          title: newBookmark.title,
          link: newBookmark.link
        });
        bookmarkCtx.updateBookmark(newBookmark);
      } else {
        const response = await axios.post(apiUrl, newBookmark);
        newBookmark._id = response.data._id;
        bookmarkCtx.addBookmark(newBookmark);
      }
      closeModalHandler();
      setEditingBookmark(null);
    } catch (error) {
      alert();
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
