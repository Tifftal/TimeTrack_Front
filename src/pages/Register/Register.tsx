import './Register.scss';
import { Button, Image, TextInput, Text, PasswordInput, Checkbox } from "@mantine/core";
import IconLogo from '../../assets/IconLogo.svg';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/image-register.png';
import Logo from '../../assets/Logo.svg';

const Register = () => {
    const navigate = useNavigate();

    return (
        <div className="register">
            <div className='register-container'>
                <div className='register-container-nav'>
                    <Image
                        h={'80%'}
                        src={IconLogo}
                    />
                    <Image
                        h={'80%'}
                        src={Logo}
                    />
                </div>
                <div className='register-container-form'>
                    <Image
                        h={48}
                        w={48}
                        src={IconLogo}
                    />
                    <Text size="28px" fw={600} mt={10}>Регистрация</Text>
                    <Text size="14px" fw={400} c={'gray'}>Welcome back! Please enter your details.</Text>
                    <TextInput
                        w={'100%'}
                        label="Email"
                        placeholder="Введите ваш Email"
                    />
                    <PasswordInput
                        w={'100%'}
                        label="Придумайте пароль"
                        placeholder="Введите пароль"
                        defaultVisible
                    />
                    <PasswordInput
                        w={'100%'}
                        label="Повторите пароль"
                        placeholder="Введите пароль"
                        defaultVisible
                    />
                    <Checkbox
                        style={{ alignSelf: 'flex-start', padding: '5px 0' }}
                        label="Сохранить пароль"
                    />
                    <Button fullWidth>Зарегистрироваться</Button>
                    <div className='register-container-form-btn'>
                        <Text size="14px" fw={400}>Уже есть аккаунт?</Text>
                        <Button variant='transparent' p={0} onClick={() => navigate('/auth')}>Войти</Button>
                    </div>
                </div>
            </div>
            <div className='register-image'>
                <Image
                    h={767}
                    src={img}
                    ml={100}
                    style={{border: '1px solid black', borderRadius: 13.5}}
                />
            </div>
        </div>
    )
}

export default Register;