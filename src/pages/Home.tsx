import { useSearchParams } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";
import ImageViewer from "../components/ImageViewer";

const Home = () => {
    const [searchParams] = useSearchParams();
    const imageUrl = searchParams.get("i");
    return imageUrl ? <ImageViewer image={imageUrl} /> : <ImageUploader />;
};

export default Home;
