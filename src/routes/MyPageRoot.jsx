import { Outlet } from "react-router-dom"
import Topbar from "../component/Topbar"

function MyPageRoot() {
    return (
        <>
            <Outlet />
        </>
    )
}

export default MyPageRoot;