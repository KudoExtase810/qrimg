import axios from "axios";
import toast from "react-hot-toast";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dnftkumo6/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "nusukcard";
const CLOUD_NAME = "dnftkumo6";

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

export const modifyCloudinaryUrl = (
    string: string,
    action: "split" | "append"
) => {
    let newUrl = "";
    if (action === "split") {
        newUrl = string.split("upload/v")[1];
    } else {
        newUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v${string}`;
    }
    return newUrl;
};
