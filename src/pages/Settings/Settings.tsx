import { Button, Flex, Grid, Group, Input, rem, Space, Text } from "@mantine/core"
import { Container } from "../../shared/Container/Container"
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { IconFileUpload, IconPhoto, IconX, IconBrandTelegram, IconBrandApple } from "@tabler/icons-react"
import { User } from "../../feature/User/User"

export const Settings = () => {
  return (
    <Flex
      direction="column"
      style={{ padding: "var(--mantine-spacing-md)" }}
    >
      <Space h="100" />

      {/* TODO: Add props for this component */}
      <User />

      <Space h="md" />

      <span style={{ padding: "10px" }}>
        <Grid>
          <Grid.Col span={{
            xl: 5,
            md: 4,
            sm: "content",
            xs: "content"
          }}
            style={{ padding: 0 }}
          >
            <h2>Персональная информация</h2>
            <Text size="sm">Обновите автар и персональную информацию</Text>
          </Grid.Col>
          <Grid.Col
            span={{
              xl: 7,
              md: 8,
              sm: 12,
              xs: 12,
            }}
            style={{ padding: 0 }}
          >
            <Container>
              <form>
                <Grid>
                  <Grid.Col
                    span={{
                      xl: 6,
                      md: 12,
                      sm: 12,
                      xs: 12
                    }}
                    style={{ padding: "0 8px 0 0" }}
                  >
                    <Input.Wrapper label="Логин">
                      <Input placeholder="Введите ваш логин"></Input>
                    </Input.Wrapper>
                    <Input.Wrapper label="Имя">
                      <Input placeholder="Введите ваше имя"></Input>
                    </Input.Wrapper>
                    <Input.Wrapper label="Фамилия">
                      <Input placeholder="Введите вашу фамилию"></Input>
                    </Input.Wrapper>
                  </Grid.Col>
                  <Grid.Col
                    span={{
                      xl: 6,
                      md: 12,
                      sm: 12,
                      xs: 12,
                    }}
                    style={{ padding: "0" }}
                  >
                    <Input.Wrapper label="Адрес электронной почты">
                      <Input placeholder="Введите адрес электронной почты"></Input>
                    </Input.Wrapper>
                    <Input.Wrapper label="Новый пароль">
                      <Input placeholder="Введите новый пароль"></Input>
                    </Input.Wrapper>
                    <Input.Wrapper label="Повторите пароль">
                      <Input placeholder="Повторите пароль"></Input>
                    </Input.Wrapper>
                  </Grid.Col>

                  <Dropzone
                    onDrop={(files) => console.log('accepted files', files)}
                    onReject={(files) => console.log('rejected files', files)}
                    maxSize={5 * 1024 ** 2}
                    accept={IMAGE_MIME_TYPE}
                    style={{ margin: "10px 0", width: "100%" }}
                  >
                    <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                      <Dropzone.Accept>
                        <IconFileUpload
                          style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                          stroke={1.5}
                        />
                      </Dropzone.Accept>
                      <Dropzone.Reject>
                        <IconX
                          style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                          stroke={1.5}
                        />
                      </Dropzone.Reject>
                      <Dropzone.Idle>
                        <Flex direction="row" align="center">
                          <IconPhoto
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                            stroke={1.5}
                          />
                          <Text size="xl" inline style={{ marginLeft: "10px" }}>
                            Нажмите для загрузки фотографии или перетащите для загрузки
                          </Text>
                        </Flex>
                      </Dropzone.Idle>
                    </Group>
                  </Dropzone>

                  <Group justify="flex-end" style={{ width: "100%" }}>
                    <Button.Group style={{ alignSelf: "flex-end" }}>
                      <Button>
                        Отменить
                      </Button>
                      <Button>
                        Сохранить
                      </Button>
                    </Button.Group>
                  </Group>
                </Grid>
              </form>
            </Container>
          </Grid.Col>
        </Grid>
      </span>

      <Space h="md" />

      <span style={{ padding: "10px" }}>
        <Grid>
          <Grid.Col
            span={{
              xl: 5,
              md: 4,
              sm: "content",
              xs: "content",
            }}
            style={{ padding: 0 }}
          >
            <h2>Интеграция с сервисами</h2>
            <Text size="sm">Добавьте интеграцию с различными сервисами</Text>
          </Grid.Col>

          <Grid.Col
            span={{
              xl: 7,
              md: 8,
              sm: 12,
              xs: 12,
            }}
            style={{ padding: 0 }}
          >
            <Container>
              <Grid>
                <Grid.Col
                  span={{
                    xl: 6,
                    md: 12,
                    sm: 12,
                    xs: 12
                  }}
                  style={{ padding: "0 8px 0 0" }}
                >
                  <Button
                    fullWidth
                    leftSection={<IconBrandTelegram />}
                    variant="outline"
                  >
                    Привязать Telegram бота
                  </Button>
                </Grid.Col>
                <Grid.Col
                  span={{
                    xl: 6,
                    md: 12,
                    sm: 12,
                    xs: 12
                  }}
                  style={{ padding: "0 8px 0 0" }}
                >
                  <Button
                    fullWidth
                    leftSection={<IconBrandApple />}
                    variant="outline"
                  >
                    Привязать мобильное приложение
                  </Button>
                </Grid.Col>
              </Grid>
            </Container>
          </Grid.Col>
        </Grid>
      </span>

      <Space h="md" />
    </Flex>
  )
}