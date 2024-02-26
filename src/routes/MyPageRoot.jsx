import { Outlet } from "react-router-dom"
import Topbar from "../component/Topbar"

function MyPageRoot() {
    return (
        <>
            <header>
                <Topbar/>
            </header>
            <div className="mainContainer">
                <Outlet />
            </div>
        </>
    )
}

export default MyPageRoot;