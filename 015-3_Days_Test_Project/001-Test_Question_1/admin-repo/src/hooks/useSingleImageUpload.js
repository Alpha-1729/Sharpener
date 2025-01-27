import { useState } from "react";

const useSingleImageUpload = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    const uploadSingleImage = async (file) => {
        setIsUploading(true);
        setUploadError(null);

        try {
            if (!file) throw new Error("No file provided for upload.");

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "category");
            formData.append("cloud_name", "deltastar");

            const response = await fetch(
                "https://api.cloudinary.com/v1_1/deltastar/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || "Image upload failed.");
            }

            const result = await response.json();
            return result.url;
        } catch (err) {
            setUploadError(err.message || "An unexpected error occurred.");
        } finally {
            setIsUploading(false);
        }
    };

    return {
        isUploading,
        uploadError,
        uploadSingleImage,
    };
};

export default useSingleImageUpload;
