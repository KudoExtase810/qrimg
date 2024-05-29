import React, { useState } from "react";
import QRCode from "qrcode";
import { uploadToCloudinary } from "../utils";
import toast from "react-hot-toast";

const ImageUploader = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const [qrCode, setQRCode] = useState<string>("");

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const reader = new FileReader();

        reader.onloadend = async () => {
            setImage(reader.result);

            setIsUploading(true);
            const imageUrl = await uploadToCloudinary(file!);

            generateQRCode(`${window.location.href}?i=${imageUrl}`);
            setIsUploading(false);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const generateQRCode = async (url: string) => {
        try {
            const qrCodeUrl = await QRCode.toDataURL(url);
            setQRCode(qrCodeUrl);
        } catch (error) {
            toast.error("QR Code generation failed.");
        }
    };

    return (
        <>
            <div className="flex flex-col items-center p-4">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Upload your image
                </h1>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mb-4 file-input file-input-bordered"
                />
                {image && (
                    <img
                        src={image as string}
                        alt="Uploaded"
                        className="max-w-xs mb-4 border border-gray-300 rounded"
                    />
                )}
                {isUploading && (
                    // <div className="fixed h-screen w-screen inset-0 bg-black opacity-40 flex items-center justify-center z-50">
                    <span className="loading loading-spinner size-16 bg-info my-4" />
                )}
                {qrCode && (
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-4">QR Code:</h2>
                        <a href={qrCode} download="qrcode.png">
                            <img
                                src={qrCode}
                                alt="QR Code"
                                className="max-w-xs border border-gray-300 rounded"
                            />
                        </a>
                    </div>
                )}
            </div>
        </>
    );
};

export default ImageUploader;
