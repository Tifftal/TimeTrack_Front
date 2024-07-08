import { Outlet } from "react-router-dom";
import './Auth.scss';
import { Button } from "@mantine/core";

const Auth = () => {
    return (
        <div className="auth">
            <div className="auth-navbar">
                <div className="auth-navbar-logo">
                    LOGO
                </div>
                <div className="auth-navbar-btn">
                    <Button variant="transparent">Зарегистрироваться</Button>
                    <Button>Войти</Button>
                </div>
            </div>
            <div className="auth-body">
                <Outlet />
            </div>
        </div>
    )
}

export default Auth