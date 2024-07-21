import { Flex, Group, Avatar, Button, Text } from "@mantine/core"
import { useSelector } from "react-redux";
import { selectUserState } from "../../store/userSlice/userSelector";

export const User = () => {
  const { surname, name, middleName, username } = useSelector(selectUserState);

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
            {surname} {name} {middleName}
          </Text>
          <Text
            size="sm"
          >
            {username}
          </Text>
        </Flex>
      </Group>

      <Button variant="light">Поделиться</Button>
    </Flex>
  )
}