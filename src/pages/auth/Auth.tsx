import { Outlet } from "react-router-dom"

const Auth = () => {
    return (
        <div className="auth">
            <div className="auth-navbar">
                NAVBAR
            </div>
            <div className="auth-body">
                <Outlet />
            </div>
        </div>
    )
}

export default Auth