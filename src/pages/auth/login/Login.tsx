import './Login.scss';
import { Button, Image, TextInput, Text, PasswordInput, Checkbox } from "@mantine/core";
import IconLogo from '../../../assets/IconLogo.svg';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="login">
            <div className='login-container'>
                <Image
                    h={48}
                    w={48}
                    src={IconLogo}
                />
                <Text size="28px" fw={600} mt={25}>Войдите в ваш аккаунт</Text>
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
                    <Button variant='transparent' p={0} onClick={()=>navigate('/auth/register')}>Зарегистрироваться</Button>
                </div>
            </div>
        </div>
    )
}

export default Login;