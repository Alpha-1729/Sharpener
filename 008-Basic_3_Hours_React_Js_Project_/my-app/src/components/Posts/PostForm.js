import React, { useEffect, useState } from 'react';

function PostForm(props) {
    const [formData, setFormData] = useState({
        imageUrl: "",
        title: "",
        description: ""
    });

    useEffect(() => {
        if (props.isEditing && props.editFormData) {
            setFormData(props.editFormData);
        } else {
            clearForm();
        }
    }, [props.isEditing, props.editFormData]);


    function clearForm() {
        setFormData({ imageUrl: "", title: "", description: "" });
    }

    function imageUrlChangeHandler(event) {
        setFormData({ ...formData, imageUrl: event.target.value });
    }
    function titleChangeHandler(event) {
        setFormData({ ...formData, title: event.target.value });
    }
    function descriptionChangeHandler(event) {
        setFormData({ ...formData, description: event.target.value });
    }

    function formSubmitHandler(event) {
        event.preventDefault();
        props.addOrEditPost(formData);
        clearForm();
    }

    return (
        <form onSubmit={formSubmitHandler}>
            <div>
                <label htmlFor="image-url">Image Url:</label>
                <input
                    type="text"
                    value={formData.imageUrl}
                    id="image-url"
                    onChange={imageUrlChangeHandler}
                />
            </div>

            <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    value={formData.title}
                    id="title"
                    onChange={titleChangeHandler}
                />
            </div>

            <div>
                <label htmlFor="blog-description">Blog Description:</label>
                <input
                    type="text"
                    value={formData.description}
                    id="blog-description"
                    onChange={descriptionChangeHandler}
                />

            </div>

            <div>
                <button type="submit">{props.isEditing ? "Edit Post" : "Add Post"}</button>
            </div>
            <hr />
        </form>
    );
}

export default PostForm;