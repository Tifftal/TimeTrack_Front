import { Button, Flex, Grid, Space, Text, Modal, TextInput, PasswordInput, Title, Progress } from "@mantine/core"
import { User } from "../../feature/User/User"
import { Container } from "../../shared/Container/Container"
import { IconChevronRight, IconDiamond, IconFlame, IconPlus } from "@tabler/icons-react"
import { useState, useEffect } from "react"
import { apiInstance } from "../../api/apiInstance"
import { selectUserState } from "../../store/userSlice/userSelector"
import { useSelector } from "react-redux"
import { useDisclosure } from "@mantine/hooks"
import { useForm } from "@mantine/form"
import { SubAccount } from "./components/SubAccount/SubAccount"
import { PieChart, PieChartCell } from "@mantine/charts";
import { DateTimePicker } from "@mantine/dates"

export const Achievements = () => {
  const [previewAchievements, setPreviewAchievements] = useState<Record<string, any>[]>([]);
  const [linkedUsers, setLinkedUsers] = useState<Record<string, string>[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statsData, setStatsData] = useState<PieChartCell[]>([]);
  const [filters, setFilters] = useState<Record<string, any>>({
    timeFrom: '',
    timeTo: '',
  })

  const [subaccountsOpened, { open: subaccOpen, close: subaccClose }] = useDisclosure(false);
  const [achievementsOpened, { open: achievementsOpen, close: achievementsClose }] = useDisclosure(false);
  const [statsOpened, { open: statsOpen, close: statsClose }] = useDisclosure(false);

  const translations: Record<string, string> = {
    "EDUCATION": "Образование",
    "UNDEFINED": "Неопределено",
    "ENTERTAINMENT": "Развлечение",
  };

  const colors = ['dodgerblue', 'orange', 'teal', 'purple']

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

  const { userType, userInventory: { diamonds }, userStatistics: { durationOfShockMode } } = useSelector(selectUserState)


  const durationOfShockModeInDays = (() => {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    return Math.floor(durationOfShockMode / millisecondsPerDay);
  })();

  useEffect(() => {
    apiInstance.get('/user/me/achievements?page=0&size=5&sort=ASC')
      .then((response) => {
        setPreviewAchievements(response.data || []);
      })
      .catch(error => {
        console.error(error);
      })

    if (userType === "ROLE_ORGANIZATION_ADMIN") {
      apiInstance.get('/desktop-user')
        .then((response) => {
          setLinkedUsers(response.data)
        })
        .catch(error => {
          console.error(error);
        })
    }

    apiInstance.get(`/desktop-activity?timeFrom=${filters.timeFrom}&timeTo=${filters.timeTo}`)
      .then((response) => {
        const stats = response.data;

        if (!stats) {
          return;
        }

        setStatsData(stats.map(({ activityCategory, duration }: { activityCategory: string, duration: number }, index: number) => {
          return {
            name: translations[activityCategory],
            value: +(duration / (1000 * 60 * 60)).toFixed(2),
            color: colors[index],
          }
        }))
      })
      .catch(error => {
        console.error(error);
      })

  }, [userType, filters]);

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
        subaccClose();
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
      <Modal opened={statsOpened} onClose={statsClose} title="Статистика" centered size="xl">
        <Flex direction="column" gap={5} align="center">
          <Flex direction="row" align="center" justify="space-between" w="60%">
            <DateTimePicker label="Время начала" placeholder="Выберите время" w="200px" clearable onChange={(value) => { setFilters({ ...filters, timeFrom: value ? new Date(String(value)).toISOString() : '' }) }} />

            <DateTimePicker label="Время конца" placeholder="Выберите время" w="200px" clearable onChange={(value) => { setFilters({ ...filters, timeTo: value ? new Date(String(value)).toISOString() : '' }) }} />
          </Flex>
          <Space h="md" />
          <PieChart withLabelsLine={false} labelsPosition="inside" labelsType="percent" withLabels data={statsData} size={300} withTooltip />
          <Space h="md" />
          <Space h="md" />
          <p>Значение рассчитано в часах</p>
          <Space h="md" />
          <Space h="md" />
        </Flex>
      </Modal>
      <Modal opened={achievementsOpened} onClose={achievementsClose} title={"Мои достижения"} centered size={"xl"}>
        <Flex direction="column" gap={5}>
          {previewAchievements.map(({ achievement, userDuration, received }) => (
            <Flex key={achievement.id} direction={'column'} gap={5} bg="color-mix(in srgb, dodgerblue 10%, transparent)" p="10px" style={{ borderRadius: 10 }}>
              <Flex direction={'row'} justify={'space-between'} align={'center'}>
                <Flex direction={'column'}>
                  <Title order={4}>{achievement.name}</Title>
                  <Text>{achievement.description}</Text>
                </Flex>
                <Flex direction={'row'} c='dodgerblue' gap={5} align={'center'}>
                  <IconDiamond />
                  <Text fw={600}>{achievement.rewardDiamonds}</Text>
                </Flex>
              </Flex>
              <Progress.Root size={'100%'}>
                <Progress.Section value={+(userDuration / achievement.duration * 100).toFixed(2)} color="lime">
                  <Progress.Label>{!received ? `${(userDuration / achievement.duration * 100).toFixed(2)}%` : "Получено"}</Progress.Label>
                </Progress.Section>
              </Progress.Root>
            </Flex>
          ))}
        </Flex>
      </Modal>

      <Modal opened={subaccountsOpened} onClose={subaccClose} title="Добавить пользователя" centered>
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
                {durationOfShockModeInDays}
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
                {diamonds}
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
                  onClick={subaccOpen}
                >
                  Добавить
                </Button>
              </Flex>

              {linkedUsers.length > 0 ? linkedUsers.map((user, idx) => (
                // @ts-expect-error
                <SubAccount {...user} key={idx} />
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
                style={{ width: "100%", padding: "0" }}
                justify="space-between"
                align="center"
              >
                <Title order={4}>Мои достижения</Title>
                <Button
                  variant="transparent"
                  rightSection={
                    <IconChevronRight />
                  }
                  onClick={achievementsOpen}
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
            <Container>
              <Flex
                direction="row"
                style={{ width: "100%" }}
                justify="space-between"
                align="center"
              >
                <Title order={4}>Статистика</Title>
                <Button
                  variant="transparent"
                  rightSection={
                    <IconChevronRight />
                  }
                  onClick={statsOpen}
                >Все</Button>
              </Flex>
            </Container>
          </Grid.Col>
        </Grid>
      </Flex>
    </>
  )
}