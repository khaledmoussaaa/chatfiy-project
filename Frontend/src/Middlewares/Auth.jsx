import { useContext } from "react"
import { User } from "../Context/UserContext"
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Login from "../Pages/Authentication/Login";

export default function Auth() {
    // Use Context
    const UserContext = useContext(User);

    // Location
    const location = useLocation();

    return UserContext.token ? <Outlet /> : <Navigate state={{ from: location }} replace to={'/login'} />
}