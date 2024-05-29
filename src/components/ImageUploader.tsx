import React, { useState } from "react";
import QRCode from "qrcode";
import { uploadToCloudinary } from "../utils";
import toast from "react-hot-toast";
import UploadedImage from "./UploadedImage";

interface ImageWithQRCode {
    image: string | ArrayBuffer | null;
    qrCode: string;
}

const ImageUploader = () => {
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [imageList, setImageList] = useState<ImageWithQRCode[]>([]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setIsUploading(true);

        files.forEach(async (file) => {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const imageUrl = await uploadToCloudinary(file);
                const encodedImageUrl = encodeURIComponent(imageUrl!);
                const qrCodeUrl = await generateQRCode(
                    `${window.location.href}?i=${encodedImageUrl}`
                );

                // Don't append the image if an error occured
                if (imageUrl) {
                    setImageList((prevImageList) => [
                        ...prevImageList,
                        { image: reader.result, qrCode: qrCodeUrl },
                    ]);
                }

                if (files.indexOf(file) === files.length - 1) {
                    setIsUploading(false);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    const generateQRCode = async (url: string): Promise<string> => {
        try {
            return await QRCode.toDataURL(url);
        } catch (error) {
            toast.error("QR Code generation failed.");
            return "";
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Upload your images
            </h1>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="mb-4 file-input file-input-bordered"
            />
            {isUploading && (
                <span className="loading loading-spinner size-16 bg-info my-4" />
            )}
            <ol className="flex flex-col items-center gap-24 md:gap-6">
                {imageList.map((item, index) => (
                    <UploadedImage
                        key={index}
                        image={item.image}
                        qrCode={item.qrCode}
                        index={index}
                    />
                ))}
            </ol>
        </div>
    );
};

export default ImageUploader;
