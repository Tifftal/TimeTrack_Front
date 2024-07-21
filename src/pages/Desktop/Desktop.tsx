import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiInstance } from "../../api/apiInstance";
import { Button, Flex, Loader, Space, Text } from "@mantine/core";
import { Container } from "../../shared/Container/Container";

// TODO : добавить стили для этой страницы
const Desktop = () => {
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const code = searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      apiInstance.get(`/desktop/sign-link/validate?code=${code}`)
        .then(response => {
          const { jwtTokens: { desktopToken } } = response.data;

          if (desktopToken) {
            setToken(desktopToken);
          }

          setLoading(false);
        })
        .catch(error => {
          if (error.response && error.response.status === 409) {
            setErrorMessage('У кода истек срок жизни');
          } else {
            setErrorMessage('Внутренняя ошибка, скоро все починим')
          }

          setLoading(false);
        })
    }
  }, []);


  return (
    <Flex h='100vh' w='50vw' align='center' justify='center' style={{ margin: "auto" }}>
      <Container>
        <Flex align='center' justify='center'>
          {isLoading && <Loader color="blue" />}
          {errorMessage && <Text c="red" size="14px">{errorMessage}</Text>}
          {token && (
            <Flex direction="column">
              <Button fullWidth onClick={() => { window.location.href = `tt:access_token=${token}` }}>Перейти в ПК версию</Button>
              <Space h="md" />
              <Button onClick={() => navigate('/auth')}>Авторизоваться</Button>
            </Flex>
          )}
        </Flex>
      </Container>
    </Flex>
  )
};

export default Desktop;