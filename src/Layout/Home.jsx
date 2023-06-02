import { Outlet } from "react-router-dom";
import NavBar from "../Shared/NavBar/NavBar";
import Footer from "../Shared/Footer/Footer";

const Home = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet />
            <Footer></Footer>
        </div>
    );
};

export default Home;