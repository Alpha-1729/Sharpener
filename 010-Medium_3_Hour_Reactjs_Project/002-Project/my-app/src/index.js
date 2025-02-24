import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import BookmarkProvider from './store/BookmarkProvider'; // Ensure the path is correct

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BookmarkProvider>
        <App />
    </BookmarkProvider>
);
