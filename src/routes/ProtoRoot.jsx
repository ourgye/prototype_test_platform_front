import { Outlet } from "react-router-dom"
import Topbar from "../component/Topbar"

function ProtoRoot() {
    return (
        <>
            <Outlet />
        </>
    )
}

export default ProtoRoot;