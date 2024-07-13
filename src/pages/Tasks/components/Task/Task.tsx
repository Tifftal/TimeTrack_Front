import { Avatar, Flex, Progress, Space } from "@mantine/core"
import { Props } from "./types"

export const Task: React.FC<Props> = ({
  src = '',
  color = 'orange',
  description,
  size,
  value
}) => {
  const percentValue = (value / size) * 100;

  return (
    <>
      <Space h="xs" />
      <Flex
        direction="row"
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
          style={{ width: '100%', justifyContent: "space-around" }}
        >
          <h3>{description}</h3>
          <Progress.Root size={size}>
            <Progress.Section value={percentValue} color={color}>
              <Progress.Label>{value}/{size}</Progress.Label>
            </Progress.Section>
          </Progress.Root>
        </Flex>

      </Flex>
      <Space h="xs" />
    </>
  )
}