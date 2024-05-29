import axios from "axios";
import toast from "react-hot-toast";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dnftkumo6/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "nusukcard";

export const uploadToCloudinary = async (file: File) => {
    let uploadedImgUrl: string | null = null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await axios.post(CLOUDINARY_URL, formData);
        uploadedImgUrl = response.data.secure_url;
    } catch (error) {
        toast.error("Image upload failed. Check the console for more details.");
        console.log(error);
    }

    return uploadedImgUrl;
};
