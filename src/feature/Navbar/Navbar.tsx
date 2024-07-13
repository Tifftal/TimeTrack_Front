import { ActionIcon, Button, Flex, Group } from "@mantine/core";
import { IconMenu2 as IconNavbarMenu, IconBell, IconFlame, IconDiamond } from "@tabler/icons-react";
import { Props } from "./types";

export const Navbar: React.FC<Props> = ({
  setIsOpen
}) => {
  return (
    <Flex
      direction="row"
      color="transparent"
      justify="space-between"
      style={{ padding: "10px" }}
    >
      <ActionIcon
        onClick={() => setIsOpen(true)}
        size="lg"
      >
        <IconNavbarMenu />
      </ActionIcon>

      <Group gap="md">
        <Button
          bg="white"
          size="sm"
          style={{
            color: "black",
            width: "auto",
            padding: "0 5px"
          }}
        >
          <IconBell />
        </Button>

        <Button
          bg="white"
          style={{
            color: "orange"
          }}
          leftSection={
            <IconFlame />
          }
        >
          1
        </Button>

        <Button
          bg="white"
          style={{
            color: "dodgerblue"
          }}
          leftSection={
            <IconDiamond />
          }
        >
          1337
        </Button>
      </Group>
    </Flex >
  )
}