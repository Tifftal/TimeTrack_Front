import './Auth.scss';
import Logo from '../../assets/Logo.svg'
import { Button, Image, TextInput, Text, PasswordInput, Checkbox } from "@mantine/core";
import IconLogo from '../../assets/IconLogo.svg';
import { useNavigate } from 'react-router-dom';

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
                    <Button variant="transparent" onClick={() => navigate('/register')}>Зарегистрироваться</Button>
                    <Button onClick={() => navigate('/auth')}>Войти</Button>
                </div>
            </div>
            <div className="auth-body">
                <div className="login">
                    <div className='login-container'>
                        <Image
                            h={48}
                            w={48}
                            src={IconLogo}
                        />
                        <Text size="28px" fw={600} mt={10}>Войдите в ваш аккаунт</Text>
                        <Text size="14px" fw={400} c={'gray'}>Welcome back! Please enter your details.</Text>
                        <TextInput
                            w={'100%'}
                            label="Логин"
                            placeholder="Введите ваш логин"
                        />
                        <PasswordInput
                            w={'100%'}
                            label="Пароль"
                            placeholder="Введите пароль"
                            defaultVisible
                        />
                        <div className='login-container-btn'>
                            <Checkbox
                                label="Сохранить пароль"
                            />
                            <Button variant='transparent' p={0}>Забыли пароль?</Button>
                        </div>
                        <Button fullWidth>Войти</Button>
                        <div className='login-container-btn'>
                            <Text size="14px" fw={400}>Еще не зарегистрированы?</Text>
                            <Button variant='transparent' p={0} onClick={() => navigate('/register')}>Зарегистрироваться</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth