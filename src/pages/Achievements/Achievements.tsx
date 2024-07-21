import { Button, Flex, Grid, Space } from "@mantine/core"
import { User } from "../../feature/User/User"
import { Container } from "../../shared/Container/Container"
import { IconChevronRight, IconDiamond, IconFlame } from "@tabler/icons-react"
import { useState, useEffect } from "react"
import { apiInstance } from "../../api/apiInstance"

export const Achievements = () => {
  const [previewAchievements, setPreviewAchievements] = useState<Record<string, string>[]>([]);

  useEffect(() => {
    apiInstance.get('/achievements?page=0&size=5&sort=ASC')
      .then((response) => {
        setPreviewAchievements(response.data.content || []);
      })
      .catch(error => {
        console.error(error);
      })
  })

  return (
    <div style={{ padding: "var(--mantine-spacing-md)" }}>
      <User />

      <Space h="md" />

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
            {/* TODO: Доделать достижения */}
            {previewAchievements.map(({ id, name, description }) => (
              <Flex
                direction="column"
                style={{
                  WebkitBoxShadow: "0px 0px 8px 0px rgba(0,0,0,0.2)",
                  MozBoxShadow: "0px 0px 8px 0px rgba(0,0,0,0.2)",
                  boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.2)",
                  backgroundColor: "rgb(255, 155, 35)",
                  borderRadius: "10px",
                  padding: "7px",
                  margin: "10px 0",
                  cursor: "pointer"
                }}
                key={id}
              >
                <h4 style={{ color: "white" }}>{name}</h4>
                <p style={{ maxHeight: "30px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "white" }}>{description}</p>
              </Flex>
            ))}
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