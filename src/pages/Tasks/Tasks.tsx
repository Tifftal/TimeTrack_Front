import { Space } from "@mantine/core"
import { Container } from "../../shared/Container/Container"
import { Task } from "./components/Task/Task"

export const Tasks = () => {
  return (
    <div style={{ padding: "var(--mantine-spacing-md)" }}>
      <Container>
        <h1>Задания</h1>
        <Task
          description="Выполните задание и получите 20 алмазов"
          size={20}
          value={15}
        />
        <Task
          description="Выполните задание и получите 20 алмазов"
          size={20}
          value={15}
        />
        <Task
          description="Выполните задание и получите 20 алмазов"
          size={20}
          value={15}
        />
      </Container>

      <Space h="md" />

      <Container>
        <h1>Еженедельные цели</h1>
        <Task
          description="Выполните задание и получите 20 алмазов"
          size={20}
          value={15}
          color="green"
        />
        <Task
          description="Выполните задание и получите 20 алмазов"
          size={20}
          value={15}
          color="cyan"
        />
        <Task
          description="Выполните задание и получите 20 алмазов"
          size={20}
          value={15}
          color="blue"
        />
      </Container>
    </div>
  )
}