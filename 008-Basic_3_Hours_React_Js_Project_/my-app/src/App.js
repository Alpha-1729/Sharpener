import React, { useState } from "react";
import PostForm from "./components/Posts/PostForm";
import PostList from "./components/Posts/PostList";
import './App.css'

const App = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const addOrEditPost = (post) => {
    if (editingPost) {
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === editingPost.id ? { ...post } : p
        )
      );
      setEditingPost(null);
    } else {
      // New posts.
      setPosts((prevPosts) => [...prevPosts, { ...post, id: Math.random().toString() }]);
    }
  };

  function deletePost(id) {
    setPosts((prevPost) => prevPost.filter((post) => post.id !== id));
  }

  function editPost(post) {
    setEditingPost(post);
  }

  return (
    <React.Fragment>
      <h1 className="center-align">Your Blog</h1>
      <h2 className="center-align">Total Blog: {posts.length}</h2>
      
      <PostForm addOrEditPost={addOrEditPost} isEditing={editingPost} editFormData={editingPost} />
      <PostList posts={posts} editPost={editPost} deletePost={deletePost} />
    </React.Fragment>
  );
};

export default App;
