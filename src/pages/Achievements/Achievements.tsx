import { Avatar, Button, Flex, Grid, Group, Space, Text, Modal, TextInput, PasswordInput } from "@mantine/core"
import { User } from "../../feature/User/User"
import { Container } from "../../shared/Container/Container"
import { IconChevronRight, IconDiamond, IconFlame, IconPlus } from "@tabler/icons-react"
import { useState, useEffect, Suspense } from "react"
import { apiInstance } from "../../api/apiInstance"
import { selectUserType } from "../../store/userSlice/userSelector"
import { useSelector } from "react-redux"
import { useDisclosure } from "@mantine/hooks"
import { useForm } from "@mantine/form"

export const Achievements = () => {
  const [previewAchievements, setPreviewAchievements] = useState<Record<string, string>[]>([]);
  const [linkedUsers, setLinkedUsers] = useState<Record<string, string>[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      surname: '',
      middleName: '',
      username: '',
      password: '',
    },
    validate: {
      name: (value) =>
        value.length === 0 ? 'Пустое поле' : null,
      surname: (value) =>
        value.length === 0 ? 'Пустое поле' : null,
      username: (value) =>
        value.length === 0 ? 'Пустое поле' : null,
      password: (value) =>
        value.length === 0 ? 'Пустое поле' : null,
    }
  })

  const userType = useSelector(selectUserType);

  useEffect(() => {
    apiInstance.get('/achievements?page=0&size=5&sort=ASC')
      .then((response) => {
        setPreviewAchievements(response.data.content || []);
      })
      .catch(error => {
        console.error(error);
      })

    if (userType === "ROLE_ORGANIZATION_ADMIN") {
      apiInstance.get('/desktop-user')
        .then((response) => {
          console.log(response.data);
          setLinkedUsers(response.data)
        })
        .catch(error => {
          console.error(error);
        })
    }
  }, [userType]);

  const registerLinkedUser = (values: {
    name: string,
    surname: string,
    middleName?: string,
    username: string,
    password: string,
  }) => {
    setErrorMessage(null);

    apiInstance.post('/desktop-user', {
      ...values
    })
      .then(response => {
        setLinkedUsers(state => [...state, response.data]);
        close();
      })
      .catch(error => {
        if (error.response && error.response.status === 409) {
          setErrorMessage("Пользователь с таким логином уже существует");
        } else {
          console.error(error);
        }
      })
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Добавить пользователя" centered>
        <form onSubmit={form.onSubmit((values) => registerLinkedUser(values))}>
          <TextInput
            w='100%'
            label='Фамилия'
            placeholder="Введите фамилию"
            key={form.key('surname')}
            {...form.getInputProps('surname')}
          />
          <TextInput
            w='100%'
            label='Имя'
            placeholder='Введите имя'
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <TextInput
            w='100%'
            label='Отчество'
            placeholder='Введите отчество'
            key={form.key('middleName')}
            {...form.getInputProps('middleName')}
          />

          <TextInput
            w='100%'
            label='Логин'
            placeholder='Введите логин'
            key={form.key('username')}
            {...form.getInputProps('username')}
          />
          <PasswordInput
            w='100%'
            label='Пароль'
            placeholder='Введите пароль'
            defaultVisible={false}
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
          {errorMessage && <Text c="red" size="14px">{errorMessage}</Text>}

          <Space h="md" />

          <Button fullWidth type="submit">Зарегистрировать</Button>
        </form>
      </Modal>

      <Flex direction="column" style={{ padding: "var(--mantine-spacing-md)" }}>
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
          </Grid.Col>
        </Grid>

        <Space h="md" />

        {userType === "ROLE_ORGANIZATION_ADMIN" && (
          <Flex
            direction="column"
          >
            <Container>
              <Flex
                direction="row"
                style={{ width: "100%" }}
                justify="space-between"
                align="center"
              >
                <h1>Связанные аккаунты</h1>

                <Button
                  variant="transparent"
                  rightSection={
                    <IconPlus />
                  }
                  onClick={open}
                >
                  Добавить
                </Button>
              </Flex>

              {linkedUsers.length > 0 ? linkedUsers.map(({
                id,
                username,
                name,
                middleName,
                surname,
                userType,
                createTime
              }) => (
                <Container key={id}>
                  <Flex>
                    <Group>
                      <Avatar
                        style={{
                          width: "75px",
                          height: "75px",
                          border: "5px solid white",
                        }}
                      />

                      <Flex
                        direction="column"
                      >
                        <Text
                          size="xl"
                          fw={600}
                        >
                          {surname} {name} {middleName}
                        </Text>
                        <Text size="sm">
                          {username} {userType}
                        </Text>
                        <Text size="sm">Зарегестрирован: {new Date(createTime).toLocaleDateString().split(',')[0]}</Text>
                      </Flex>
                    </Group>
                  </Flex>
                </Container>
              )) : <p>Нет связанных с Вашим аккаунтом пользователей</p>}
            </Container>
          </Flex>
        )}

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
            <Container>
              <h1>Статистика</h1>
            </Container>
          </Grid.Col>
        </Grid>
      </Flex>
    </>
  )
}