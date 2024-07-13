import { Avatar, Button, Flex, Group, Space } from "@mantine/core"
import React from "react"
import { Props } from "./types"
import { IconDiamond } from "@tabler/icons-react"

export const Product: React.FC<Props> = ({
  src = '',
  name,
  description = '',
  price,
}) => {
  return (
    <>
      <Space h="xs" />
      <Flex
        direction="row"
        justify="space-between"
        align="flex-end"
      >
        <Group>
          <Avatar
            color="blue"
            radius="xl"
            size="lg"
            src={src}
            alt="Product image"
            style={{ marginRight: "10px" }}
          />

          <Flex
            direction="column"
            style={{ justifyContent: 'space-between', padding: '0 10px' }}
          >
            <h3>{name}</h3>
            <p>{description}</p>
          </Flex>
        </Group>

        <Button
          style={{
            color: "dodgerblue",
            border: "2px solid dodgerblue",
            backgroundColor: "transparent"
          }}
          leftSection={
            <IconDiamond />
          }
        >
          {price}
        </Button>
      </Flex>
    </>
  )
}