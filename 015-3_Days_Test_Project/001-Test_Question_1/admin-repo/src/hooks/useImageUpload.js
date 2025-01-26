import { useState } from "react";

const useImageUpload = (file) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

    const uploadImage = async (file) => {
        setUploading(true);
        setError(null);
        setUploadedImageUrl(null);

        try {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "category");
            data.append("cloud_name", "deltastar");

            const response = await fetch(
                "https://api.cloudinary.com/v1_1/deltastar/image/upload",
                {
                    method: "POST",
                    body: data,
                }
            );

            if (!response.ok) {
                throw new Error("Image upload failed. Please try again.");
            }

            const result = await response.json();
            setUploadedImageUrl(result.url);
            return { url: result.url, error: null };
        } catch (err) {
            setError(err.message || "An unexpected error occurred.");
            return { url: null, error: err.message };
        } finally {
            setUploading(false);
        }
    };

    return {
        uploading,
        error,
        uploadedImageUrl,
        uploadImage,
    };
};

export default useImageUpload;
