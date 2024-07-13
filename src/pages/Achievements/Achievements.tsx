import { Button, Flex, Grid, Space } from "@mantine/core"
import { User } from "../../feature/User/User"
import { Container } from "../../shared/Container/Container"
import { IconChevronRight, IconDiamond, IconFlame } from "@tabler/icons-react"

export const Achievements = () => {
  return (
    <div style={{ padding: "var(--mantine-spacing-md)" }}>
      {/* TODO: Add support for User component */}
      <User />

      <Space h="md" />

      {/* <Container>
      </Container> */}
      <Grid>
        <Grid.Col
          span={{
            xl: 6,
            md: 6,
            sm: "content",
            xs: "content"
          }}
        >
          <Container
            backgroundColor="#FF9B23"
            color="white"
          >
            <h2>Ударный режим</h2>
            <Button
              bg="white"
              style={{
                color: "orange",
                width: "fit-content"
              }}
              leftSection={
                <IconFlame />
              }
            >
              1
            </Button>
          </Container>

          <Space h="md" />

          <Container>
            <Flex
              direction="row"
              style={{ width: "100%" }}
              justify="space-between"
              align="center"
            >
              <h1>Достижения</h1>
              <Button
                variant="transparent"
                rightSection={
                  <IconChevronRight />
                }
              >
                Все
              </Button>
            </Flex>
          </Container>
        </Grid.Col>

        <Grid.Col
          span={{
            xl: 6,
            md: 6,
            sm: "content",
            xs: "content"
          }}
        >
          <Container
            backgroundColor="#07BFFC"
            color="white"
          >
            <h2>Алмазы</h2>
            <Button
              bg="white"
              style={{
                color: "dodgerblue",
                width: "fit-content",
              }}
              leftSection={
                <IconDiamond />
              }
            >
              1337
            </Button>
          </Container>

          <Space h="md" />

          <Container>
            <h1>Статистика</h1>
          </Container>
        </Grid.Col>
      </Grid>
    </div>
  )
}