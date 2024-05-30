import { useSearchParams } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";
import ImageViewer from "../components/ImageViewer";
import { modifyCloudinaryUrl } from "../utils";

const Home = () => {
    const [searchParams] = useSearchParams();
    const imageData = searchParams.get("i");

    return imageData ? (
        <ImageViewer image={modifyCloudinaryUrl(imageData, "append")} />
    ) : (
        <ImageUploader />
    );
};

export default Home;
