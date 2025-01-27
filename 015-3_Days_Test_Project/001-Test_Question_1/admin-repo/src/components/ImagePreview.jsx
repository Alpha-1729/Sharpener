import React from "react";
import styles from "./ImagePreview.module.css";

function ImagePreview({ imgUrl }) {
    const imageBaseName = imgUrl.split('/').pop();

    return (
        <div className={styles.previewContainer}>
            <a href={imgUrl} target="_blank" rel="noopener noreferrer" className={styles.previewLink}>
                {imageBaseName}
            </a>
        </div>
    );
}

export default ImagePreview;
