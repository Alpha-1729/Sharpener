import React from "react";

function PostList(props) {
    if (props.posts.length === 0) {
        return <p>No posts available</p>;
    }

    return (
        <div>
            {props.posts.map((post) => {
                return (
                    <React.Fragment key={post.id}>
                        <h3>{post.title}</h3>
                        <img src={post.imageUrl} alt={post.title} style={{ width: "100px", height: "100px" }} />
                        <p>{post.description}</p>
                        <div>
                            <button onClick={() => { props.editPost(post) }}>Edit Blog</button>
                            <button onClick={() => { props.deletePost(post.id) }}>Delete Blog</button>
                        </div>
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default PostList;
