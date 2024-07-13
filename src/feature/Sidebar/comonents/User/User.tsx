import { Avatar, Button, Flex } from "@mantine/core"

export const User = () => {
  return (
    <Flex
      align="center"
      direction="row"
      justify="space-between"
      style={{ width: "100%" }}
    >
      <div>
        <Avatar
          radius="xl"
          alt="No image"
          color="initials"
        />
      </div>
      <div>
        <h3>Ivan Ivanov</h3>
        <p>iivanov@yandex.ru</p>
      </div>
      <div>
        <Button />
      </div>
    </Flex>
  )
}