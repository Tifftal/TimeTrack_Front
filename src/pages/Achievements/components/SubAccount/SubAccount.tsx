import { ActionIcon, Avatar, Button, Code, Flex, Group, Modal, rem, Skeleton, Space, Text, Tooltip } from "@mantine/core"
import { Props } from "./types"
import { Container } from "../../../../shared/Container/Container"
import { useDisclosure } from "@mantine/hooks"
import { apiInstance } from "../../../../api/apiInstance"
import { useState } from "react"
import { IconCheck, IconCopy } from "@tabler/icons-react"
import './styles.scss';

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
  const [copied, setCopied] = useState(false);

  const generateCode = async () => {
    setLink('');

    try {
      const response = await apiInstance.get(`/desktop/sign-link?userId=${id}`);
      const { code } = response.data;
      const preparedLink = `${window.location.origin}/auth/desktop?code=${code}`;
      setLink(preparedLink);

    } catch (error) {
      console.error(error);
    }
  };

  const CopyUrl = () => {
    if (link) {
      setCopied(false);
      navigator.clipboard.writeText(link).then(() => {
        setCopied(true);
      });
      setTimeout(()=>{
        setCopied(false)
      }, 5000)
    }
  }

  return (
    <>
      <Modal size="md" centered opened={opened} onClose={close} title={`${surname} ${name} ${middleName}`}>
        {link !== null && (
          typeof link === 'string' && link !== '' ? (
            <Flex
              direction={"row"}
              align={'center'}
              gap={10}
              p={'0 10px'}
              style={{ backgroundColor: "var(--mantine-color-blue-light)", borderRadius: 5 }}
            >
              <Code block color="transparent" className="link">
                {link}
              </Code>
              <Tooltip label={copied ? 'Скопировано' : 'Копировать'} withArrow position="right">
                <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={CopyUrl}>
                  {copied ? (
                    <IconCheck style={{ width: rem(18) }} />
                  ) : (
                    <IconCopy style={{ width: rem(18) }} />
                  )}
                </ActionIcon>
              </Tooltip>
            </Flex>
          ) : (
            <Skeleton animate={true} height={8} width={'100%'} radius='xl' />
          )
        )}
        <Space h="md" />
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
              <Text size="sm">Зарегистрирован: {new Date(createTime || Date.now()).toLocaleDateString().split(',')[0]}</Text>
            </Flex>
          </Group>
          <Flex direction="column" align="center" justify="center">
            <Button size="xs" onClick={() => { generateCode(); open() }}>Получить ссылку</Button>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}