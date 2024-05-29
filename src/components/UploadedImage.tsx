import { FaArrowDownLong, FaArrowRightLong } from "react-icons/fa6";

interface UploadedImageProps {
    image: string | ArrayBuffer | null;
    qrCode: string;
    index: number;
}

const UploadedImage = ({ image, qrCode, index }: UploadedImageProps) => {
    return (
        <li className="flex flex-col md:flex-row items-center gap-4">
            <img
                src={image as string}
                alt={`Uploaded ${index + 1}`}
                className="w-full md:max-w-xs border border-gray-300 rounded"
            />
            <FaArrowRightLong size={36} className="hidden md:block" />
            <FaArrowDownLong size={36} className="md:hidden" />
            <a href={qrCode} download={`qrcode_${index + 1}.png`}>
                <img
                    src={qrCode}
                    alt={`QR Code ${index + 1}`}
                    className="w-full md:max-w-xs border border-gray-300 rounded"
                />
            </a>
        </li>
    );
};

export default UploadedImage;
