import './Register.scss';
import { Button, Image, TextInput, Text, PasswordInput, Checkbox } from "@mantine/core";
import IconLogo from '../../assets/IconLogo.svg';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/image-register.png';
import Logo from '../../assets/Logo.svg';
import { useForm } from '@mantine/form';
import { authInstance } from '../../api/authInstance';

const Register = () => {
  const navigate = useNavigate();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      mail: '',
      password: '',
      confirmPassword: '',
      username: '',
      name: '',
      middleName: '',
      surname: '',
    },
    validate: {
      mail: (value) =>
        value.length === 0 ? 'Пустое поле' : null,
      password: (value) =>
        value.length === 0 ? 'Пустое поле' : null,
      confirmPassword: (value, values) =>
        value !== values.password ? 'Пароли не совпадают' : value.length === 0 ? 'Пустое поле' : null,
      name: (value) =>
        value.length === 0 ? 'Пустое поле' : null,
      surname: (value) =>
        value.length === 0 ? 'Пустое поле' : null,
      username: (value) =>
        value.length === 0 ? 'Пустое поле' : null,
    },
  });

  // const Register = (values: {email: string, password: string, confir})

  const handleSubmitForm = (values: Record<string, unknown>) => {
    delete values.confirmPassword;

    form.setValues((prev) => ({ ...prev, confirmPassword: '' }))

    console.log(values);

    authInstance.post('/register', {
      ...values
    })
      .then((response) => {
        // @ts-expect-error
        const { jwtTokens } = response.data;

        const { access, refresh, desktopToken } = jwtTokens;

        localStorage.setItem('ACCESS_TOKEN', access);
        localStorage.setItem('REFRESH_TOKEN', refresh);
        localStorage.setItem('DESKTOP_TOKEN', desktopToken);

        navigate('/home');
      })
      .catch((error) => {
        console.error(error)
      })
  }

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
        <form className='register-container-form' onSubmit={form.onSubmit(handleSubmitForm)}>
          <Image
            h={48}
            w={48}
            src={IconLogo}
          />
          <Text size="28px" fw={600} mt={10}>Регистрация</Text>
          <Text size="14px" fw={400} c={'gray'}>Welcome back! Please enter your details.</Text>
          <TextInput
            w='100%'
            label='Фамилия'
            placeholder='Введите вашу фамилию'
            key={form.key('surname')}
            {...form.getInputProps('surname')}
          />
          <TextInput
            w='100%'
            label='Имя'
            placeholder='Введите ваше имя'
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <TextInput
            w='100%'
            label='Отчество'
            placeholder='Введите ваше отчество'
            key={form.key('middleName')}
            {...form.getInputProps('middleName')}
          />
          <TextInput
            w='100%'
            label='username'
            placeholder="Введите логин"
            key={form.key('username')}
            {...form.getInputProps('username')}
          />
          <TextInput
            w={'100%'}
            label="Email"
            placeholder="Введите ваш Email"
            key={form.key('mail')}
            {...form.getInputProps('mail')}
          />
          <PasswordInput
            w={'100%'}
            label="Придумайте пароль"
            placeholder="Введите пароль"
            defaultVisible={false}
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
          <PasswordInput
            w={'100%'}
            label="Повторите пароль"
            placeholder="Введите пароль"
            defaultVisible={false}
            key={form.key('confirmPassword')}
            {...form.getInputProps('confirmPassword')}
          />
          <Checkbox
            style={{ alignSelf: 'flex-start', padding: '5px 0' }}
            label="Сохранить пароль"
          />
          <Button fullWidth type='submit'>Зарегистрироваться</Button>
          <div className='register-container-form-btn'>
            <Text size="14px" fw={400}>Уже есть аккаунт?</Text>
            <Button variant='transparent' p={0} onClick={() => navigate('/auth')}>Войти</Button>
          </div>
        </form>
      </div>
      <div className='register-image'>
        <Image
          h={767}
          src={img}
          ml={100}
          style={{ border: '1px solid black', borderRadius: 13.5 }}
        />
      </div>
    </div>
  )
}

export default Register;