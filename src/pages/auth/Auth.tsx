import './Auth.scss';
import Logo from '../../assets/Logo.svg'
import { Button, Image, TextInput, Text, PasswordInput, Checkbox } from "@mantine/core";
import IconLogo from '../../assets/IconLogo.svg';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { authInstance } from '../../api/authInstance';

const Auth = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      login: '',
      password: '',
    },
    validate: {
      login: (value) =>
        value.length === 0 ? 'Пустое поле' : null,
      password: (value) =>
        value.length === 0 ? 'Пустое поле' : null,
    },
  });

  const Login = (values: { login: string, password: string }) => {
    setErrorMessage(null);

    authInstance.post('/login', {
      // TODO: Лучше бы , чтобы сущности на клиенте совпадали с сущностями на сервере
      username: values.login,
      password: values.password
    })
      .then(respose => {
        console.log(respose)
        localStorage.setItem('accessToken', respose.data.jwtTokens.access)
        localStorage.setItem('refreshToken', respose.data.jwtTokens.refresh)
        navigate('/home/tasks');
      })
      .catch(error => {
        if (error.response && error.response.status === 409) {
          setErrorMessage('Неверный логин или пароль');
        } else {
          console.error(error);
        }
      })
  }

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
          <form className='login-container' onSubmit={form.onSubmit((values) => Login(values))}>
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
              key={form.key('login')}
              {...form.getInputProps('login')}
            />
            <PasswordInput
              w={'100%'}
              label="Пароль"
              placeholder="Введите пароль"
              defaultVisible={false}
              key={form.key('password')}
              {...form.getInputProps('password')}
            />
            {errorMessage && <Text c="red" size={'14px'}>{errorMessage}</Text>}
            <div className='login-container-btn'>
              <Checkbox
                label="Сохранить пароль"
              />
              <Button variant='transparent' p={0}>Забыли пароль?</Button>
            </div>
            <Button fullWidth type="submit">Войти</Button>
            <div className='login-container-btn'>
              <Text size="14px" fw={400}>Еще не зарегистрированы?</Text>
              <Button variant='transparent' p={0} onClick={() => navigate('/register')}>Зарегистрироваться</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Auth