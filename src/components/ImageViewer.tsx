interface ImageViewerProps {
    image: string;
}

const ImageViewer = ({ image }: ImageViewerProps) => {
    return (
        <img
            className="mx-auto p-2 max-w-full"
            src={image}
            alt="Uploaded image"
        />
    );
};

export default ImageViewer;
