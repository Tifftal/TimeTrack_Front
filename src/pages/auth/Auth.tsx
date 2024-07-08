import { Outlet, useNavigate } from "react-router-dom";
import './Auth.scss';
import { Button, Image } from "@mantine/core";
import IconLogo from '../../assets/IconLogo.svg';
import Logo from '../../assets/Logo.svg'

const Auth = () => {
    const navigate = useNavigate();

    return (
        <div className="auth">
            <div className="auth-navbar">
                <div className="auth-navbar-logo">
                    <Image
                        h={'80%'}
                        src={IconLogo}
                    />
                    <Image
                        h={'80%'}
                        src={Logo}
                    />
                </div>
                <div className="auth-navbar-btn">
                    <Button variant="transparent" onClick={() => navigate('register')}>Зарегистрироваться</Button>
                    <Button onClick={() => navigate('login')}>Войти</Button>
                </div>
            </div>
            <div className="auth-body">
                <Outlet />
            </div>
        </div>
    )
}

export default Auth