import { Outlet } from "react-router-dom"
import Topbar from "../component/Topbar"

function RouterRoot() {

    return (
        <>
            <header>
                <Topbar/>
            </header>
            <div className="main-container">
                <Outlet />
            </div>
        </>
    )
}

export default RouterRoot;