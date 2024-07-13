import { Flex, Group, Avatar, Button, Text } from "@mantine/core"

export const User = () => {
  return (
    <Flex
      direction="row"
      align="center"
      justify="space-between"
      style={{
        padding: "0 20px 0 75px",
        borderRadius: "10px"
      }}
      bg="white"
    >
      <Group>
        <Avatar
          style={{
            width: "150px",
            height: "150px",
            border: "5px solid white",
            margin: "-50px 0 0 0"
          }}
        />

        <Flex
          direction="column"
        >
          <Text
            size="xl"
            fw={700}
          >
            Ivan Ivanov
          </Text>
          <Text
            size="sm"
          >
            iivanov@yandex.ru
          </Text>
        </Flex>
      </Group>

      <Button variant="light">Поделиться</Button>
    </Flex>
  )
}