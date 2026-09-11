import ChatBot from "@src/components/ChatBot";
import Footer from "@src/components/Footer";
import Header from "@src/components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <ChatBot />
            <Footer />
        </>
    );
};

export default MainLayout;
