import { useState } from "react";

const useMultipleImageUpload = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    const uploadMultipleImages = async (files) => {
        setIsUploading(true);
        setUploadError(null);

        try {
            if (!files || files.length === 0) throw new Error("No files provided for upload.");

            const uploadedUrls = [];

            // Iterate over all the files
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
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
                } else {
                    const result = await response.json();
                    uploadedUrls.push(result.url);
                }
            }

            return uploadedUrls;
        } catch (err) {
            setUploadError(err.message || "An unexpected error occurred.");
        } finally {
            setIsUploading(false);
        }
    };

    return {
        isUploading,
        uploadError,
        uploadMultipleImages,
    };
};

export default useMultipleImageUpload;
