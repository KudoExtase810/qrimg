import { Toaster } from "react-hot-toast";
import Routes from "./components/Routes";

function App() {
    return (
        <main className="mx-auto container">
            <Toaster toastOptions={{ duration: 4000 }} />
            <Routes />
        </main>
    );
}

export default App;
