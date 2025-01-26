export const uploadImage = async (file) => {
    try {
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", 'category')
        data.append("cloud_name", 'deltastar')
        const response = await fetch("https://api.cloudinary.com/v1_1/deltastar/image/upload", {
            method: 'POST',
            body: data
        });

        const uploadResponse = await response.json();
        return { response: { url: uploadResponse.url }, error: null };
    }
    catch (err) {
        return { response: null, error: "Failed to upload image." };
    }
};



const handleFileUpload = async (file) => {



}


