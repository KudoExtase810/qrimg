interface FailedUploads {
    images: (string | ArrayBuffer | null)[];
}

const FailedUploads = ({ images }: FailedUploads) => {
    return (
        <section id="failed">
            <h2 className="text-2xl font-semibold text-error mb-6">
                Failed Uploads
            </h2>
            <ol className="flex gap-3 flex-wrap">
                {images.map((image, idx) => (
                    <img
                        key={idx}
                        className="rounded-md max-w-96 self-start"
                        src={image as string}
                        alt="Failed upload"
                    />
                ))}
            </ol>
        </section>
    );
};

export default FailedUploads;
