import { Route, Routes as BaseRoutes } from "react-router-dom";
import Home from "../pages/Home";

const Routes = () => {
    return (
        <BaseRoutes>
            <Route path="/" element={<Home />} />
        </BaseRoutes>
    );
};

export default Routes;
