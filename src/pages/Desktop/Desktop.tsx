import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiInstance } from "../../api/apiInstance";
import { Flex, Text } from "@mantine/core";
import { Container } from "../../shared/Container/Container";

// TODO : добавить стили для этой страницы
const Desktop = () => {
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      apiInstance.get(`/desktop/sign-link/validate?code=${code}`)
        .then(response => {
          const { jwtTokens: { desktopToken } } = response.data;

          // if (desktopToken) {

          // }
        })
        .catch(error => {
          if (error.response && error.response.status === 409) {
            setErrorMessage('У кода истек срок жизни');
          } else {
            setErrorMessage('Внутренняя ошибка, скоро все починим')
          }
        })
    }

  }, [code]);

  return (
    <Flex h='100vh' align='center' justify='center' style={{ padding: "150px" }}>
      <Container>
        {errorMessage && <Text c="red" size="14px">{errorMessage}</Text>}
      </Container>
    </Flex>
  )
};

export default Desktop;