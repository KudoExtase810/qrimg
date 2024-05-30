import React, { useState } from "react";
import QRCode from "qrcode";
import { modifyCloudinaryUrl, uploadToCloudinary } from "../utils";
import toast from "react-hot-toast";
import UploadedImage from "./UploadedImage";
import FailedUploads from "./FailedUploads";

interface ImageWithQRCode {
    image: string | ArrayBuffer | null;
    qrCode: string;
}

const ImageUploader = () => {
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [imageList, setImageList] = useState<ImageWithQRCode[]>([]);
    const [failedUploads, setFailedUploads] = useState<
        ImageWithQRCode["image"][]
    >([]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setIsUploading(true);

        files.forEach(async (file) => {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const imageUrl = await uploadToCloudinary(file);

                // Proceed if no errors
                if (imageUrl) {
                    const splitUrl = modifyCloudinaryUrl(imageUrl, "split");

                    const qrCodeUrl = await generateQRCode(
                        `${window.location.href}?i=${encodeURIComponent(
                            splitUrl
                        )}`
                    );
                    setImageList((prevImageList) => [
                        ...prevImageList,
                        { image: reader.result, qrCode: qrCodeUrl },
                    ]);
                } else {
                    failedUploads.push(reader.result);
                    setFailedUploads([...failedUploads]);
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
        <>
            <div className="flex flex-col items-center p-4">
                <h1 className="text-2xl font-semibold mb-6 text-center">
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

            {failedUploads.length ? (
                <>
                    <a
                        href="#failed"
                        className="h-16 w-16 flex items-center justify-center text-3xl font-bold bg-error text-error-content fixed top-4 right-4 animate-pulse"
                    >
                        !
                    </a>
                    <FailedUploads images={failedUploads} />
                </>
            ) : null}
        </>
    );
};

export default ImageUploader;
