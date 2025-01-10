import React, { useReducer } from "react";
import BookmarkContext from "./bookmark-context";

const defaultBookmarkState = {
	bookmarks: [],
};

const bookmarkReducer = (state, action) => {
	switch (action.type) {
		case 'ADD':
			const updatedBookmarks = state.bookmarks.concat(action.bookmark);
			return { bookmarks: updatedBookmarks };
		case 'REMOVE':
			const filteredBookmarks = state.bookmarks.filter(bookmark => bookmark._id !== action.id);
			return { bookmarks: filteredBookmarks };
		case 'UPDATE':
			const updatedBookmarkList = state.bookmarks.map(bookmark =>
				bookmark._id === action.bookmark._id ? action.bookmark : bookmark
			);
			return { bookmarks: updatedBookmarkList };
		case 'SET':
			return { bookmarks: action.bookmarks };
		default:
			return state;
	}
};

function BookmarkProvider(props) {
	const [bookmarkState, dispatchBookmarkAction] = useReducer(bookmarkReducer, defaultBookmarkState);

	const addBookmarkHandler = (bookmark) => {
		dispatchBookmarkAction({ type: 'ADD', bookmark: bookmark });
	};

	const removeBookmarkHandler = (id) => {
		dispatchBookmarkAction({ type: 'REMOVE', id: id });
	};

	const updateBookmarkHandler = (bookmark) => {
		dispatchBookmarkAction({ type: 'UPDATE', bookmark: bookmark });
	};

	const setBookmarksHandler = (bookmarks) => {
		dispatchBookmarkAction({ type: 'SET', bookmarks: bookmarks });
	};

	const bookmarkContext = {
		bookmarks: bookmarkState.bookmarks,
		addBookmark: addBookmarkHandler,
		removeBookmark: removeBookmarkHandler,
		updateBookmark: updateBookmarkHandler,
		setBookmarks: setBookmarksHandler,
	};

	return (
		<BookmarkContext.Provider value={bookmarkContext}>
			{props.children}
		</BookmarkContext.Provider>
	);
}

export default BookmarkProvider;
