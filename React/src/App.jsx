import { AuthenticateProvider } from "@src/contexts/AuthenticateContext";
import AppRouter from "@src/routers";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

function App() {
    return (
        <BrowserRouter>
            <AuthenticateProvider>
                <AppRouter />
            </AuthenticateProvider>
            <Toaster richColors={true} />
        </BrowserRouter>
    );
}

export default App;
