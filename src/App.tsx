import { Toaster } from "react-hot-toast";
import Routes from "./components/Routes";
import { useEffect } from "react";

function App() {
    useEffect(() => {
        console.log(window.location.href);
    }, []);
    return (
        <main className="mx-auto container">
            <Toaster toastOptions={{ duration: 4000 }} />
            <Routes />
        </main>
    );
}

export default App;
