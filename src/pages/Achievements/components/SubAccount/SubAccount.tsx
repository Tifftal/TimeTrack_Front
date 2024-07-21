import { Avatar, Button, Code, Flex, Group, Modal, Skeleton, Space, Text } from "@mantine/core"
import { Props } from "./types"
import { Container } from "../../../../shared/Container/Container"
import { useDisclosure } from "@mantine/hooks"
import { apiInstance } from "../../../../api/apiInstance"
import { useState } from "react"

export const SubAccount = ({
  surname,
  name,
  middleName,
  username,
  userType,
  createTime,
  id
}: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [link, setLink] = useState<string | null>(null);

  const generateCode = async () => {
    setLink('');

    apiInstance.get(`/desktop/sign-link?userId=${id}`)
      .then((response) => {
        const { code } = response.data;

        const preparedLink = `${window.location.origin}/auth/desktop?code=${code}`;

        setLink(preparedLink);
      })
      .catch(error => {
        console.error(error);
      })
  }

  console.log("LINK", link)

  return (
    <>
      <Modal size="md" centered opened={opened} onClose={close} title={`${surname} ${name} ${middleName}`}>
        {link !== null && (
          typeof link === 'string' && link !== '' ? (
            <Code block>{link}</Code>
          ) : (
            <Skeleton animate={true} height={8} width={'100%'} radius='xl' />
          )
        )}
        <Space h="md" />
        <Button onClick={generateCode} fullWidth>Получить код для ссылки на вход</Button>
      </Modal>
      <Container key={id}>
        <Flex style={{ cursor: "pointer" }} direction="row" justify="space-between">
          <Group>
            <Avatar
              style={{
                width: "75px",
                height: "75px",
                border: "5px solid white",
              }}
            />

            <Flex
              direction="column"
            >
              <Text
                size="xl"
                fw={600}
              >
                {surname} {name} {middleName}
              </Text>
              <Text size="sm">
                {username} {userType}
              </Text>
              <Text size="sm">Зарегестрирован: {new Date(createTime).toLocaleDateString().split(',')[0]}</Text>
            </Flex>
          </Group>
          <Flex direction="column" align="center" justify="center">
            <Button size="xs" onClick={open}>Получить ссылку</Button>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}