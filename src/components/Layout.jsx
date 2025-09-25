import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout () {
    return(
        <div className="APP">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;