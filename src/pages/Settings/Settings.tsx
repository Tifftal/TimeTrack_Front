import { Button, Flex, Grid, Group, Input, rem, Space, Text } from "@mantine/core"
import { Container } from "../../shared/Container/Container"
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { IconFileUpload, IconPhoto, IconX, IconBrandTelegram, IconBrandApple } from "@tabler/icons-react"
import { User } from "../../feature/User/User"
import { useForm } from "@mantine/form"
import { useDispatch, useSelector } from "react-redux"
import { selectUserState } from "../../store/userSlice/userSelector"
import { DatePickerInput } from "@mantine/dates"
import { apiInstance } from "../../api/apiInstance"
import { setUser } from "../../store/userSlice/userSlice"
import { useEffect } from "react"

export const Settings = () => {
  const { name, middleName, surname, id } = useSelector(selectUserState);
  const dispatch = useDispatch();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: name,
      middleName: middleName,
      surname: surname,
      dob: '',
    },
    validate: {
      name: (value) => value.length === 0 ? 'Пустое поле' : null,
      middleName: (value) => value.length === 0 ? 'Пустое поле' : null,
      surname: (value) => value.length === 0 ? 'Пустое поле' : null,
      dob: (value) => value.length === 0 ? 'Пустое поле' : null,
    }
  });

  useEffect(() => {
    if (name && middleName && surname && id) {
      form.setValues({
        name,
        middleName,
        surname,
      });
    }
  }, [name, middleName, surname, id]);

  const changeUserData = (values: Record<string, string>) => {
    apiInstance.put(`/user/${id}`, {
      ...values
    })
      .then(response => {
        dispatch(setUser(response.data));
      })
      .catch(error => {
        console.error(error);
      })
  }

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
              <form onSubmit={form.onSubmit((values) => changeUserData(values))}>
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
                      <Input
                        placeholder="Введите ваш логин"
                      // value={username}
                      ></Input>
                    </Input.Wrapper>
                    <Input.Wrapper label="Фамилия">
                      <Input
                        placeholder="Введите вашу фамилию"
                        // value={surname}
                        key={form.key('surname')}
                        {...form.getInputProps('surname')}
                      ></Input>
                    </Input.Wrapper>
                    <Input.Wrapper label="Имя">
                      <Input
                        placeholder="Введите ваше имя"
                        // value={name}
                        key={form.key('name')}
                        {...form.getInputProps('name')}
                      ></Input>
                    </Input.Wrapper>
                    <Input.Wrapper label="Отчество">
                      <Input
                        placeholder="Введите ваше отчество"
                        // value={middleName}
                        key={form.key('middleName')}
                        {...form.getInputProps('middleName')}
                      ></Input>
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
                    <Input.Wrapper label="Введите дату рождения">
                      <DatePickerInput
                        placeholder="Введите дату рождения"
                        key={form.key('dob')}
                        {...form.getInputProps('dob')}
                      />
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
                      <Button type="submit">
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