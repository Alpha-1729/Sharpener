import { useState } from "react";

const useImageUpload = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

    const uploadImages = async (files) => {
        setIsUploading(true);
        setUploadError(null);
        setUploadedImageUrls([]);

        try {
            const uploadedUrls = [];

            for (const file of files) {
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
                    throw new Error("Image upload failed for one or more files.");
                }

                const result = await response.json();
                console.log(result);
                uploadedUrls.push(result.url);
            }

            setUploadedImageUrls(uploadedUrls);
        } catch (err) {
            setUploadError(err.message || "An unexpected error occurred.");
        } finally {
            setIsUploading(false);
        }
    };

    return {
        isUploading,
        uploadError,
        uploadedImageUrls,
        uploadImages,
    };
};

export default useImageUpload;
