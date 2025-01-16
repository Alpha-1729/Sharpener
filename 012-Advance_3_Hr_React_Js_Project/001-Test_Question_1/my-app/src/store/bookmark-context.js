import React from "react";

const BookmarkContext = React.createContext({
    bookmarks: [],
    addBookmark: (bookmark) => { },
    removeBookmark: (id) => { },
    updateBookmark: (bookmark) => { },
    setBookmarks: (bookmarks) => { }
});

export default BookmarkContext;
