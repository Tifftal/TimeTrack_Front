import { Avatar, Flex, Group, Progress, Space, Text } from "@mantine/core"
import { Props } from "./types";
import { IconInfoCircle } from "@tabler/icons-react";

export const Task: React.FC<Props> = ({
  src = '',
  color = 'orange',
  description,
  size,
  value,
  target = false
}) => {
  const percentValue = (value / size) * 100;

  return (
    <>
      <Space h="xs" />
      <Flex
        direction="row"
        justify="center"
        align="flex-end"
      >
        <Avatar
          color="blue"
          radius="xl"
          size="lg"
          src={src}
          alt="Task image"
          style={{ marginRight: "10px" }}
        />

        <Flex
          direction="column"
          style={{ width: '100%', justifyContent: "space-around", padding: "0 10px" }}
        >
          <Group>
            <h3>{description}</h3>
            <IconInfoCircle
              color="black"
              size="20"
            />
          </Group>

          <Progress.Root size={size}>
            <Progress.Section value={percentValue} color={color}>
              <Progress.Label>{value}/{size}</Progress.Label>
            </Progress.Section>
          </Progress.Root>
        </Flex>

        {target && (
          <Text fw={700}>{percentValue}%</Text>
        )}
      </Flex>
      <Space h="xs" />
    </>
  )
}