import React from "react";
import styles from "./ImagePreview.module.css";

function ImagePreview({ imgUrls }) {
    return (
        <div className={styles.previewContainer}>
            {imgUrls && imgUrls.length > 0 &&
                imgUrls.map((imgUrl, index) => {
                    const imageBaseName = imgUrl.split('/').pop();
                    return (
                        <div key={index} className={styles.previewItem}>
                            <a href={imgUrl} target="_blank" rel="noopener noreferrer" className={styles.previewLink}>
                                {imageBaseName}
                            </a>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default ImagePreview;
