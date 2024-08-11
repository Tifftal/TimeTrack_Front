import { useCallback, useEffect, useState } from "react";
import { apiInstance } from "../../api/apiInstance";
import { Accordion, Flex, Input, Pagination, Select, Space, Table, Text } from "@mantine/core";
import { Container } from "../../shared/Container/Container";
import { DateTimePicker } from "@mantine/dates";

export const Stats = () => {
  const [activity, setActivity] = useState<Record<string, any>[]>([]);
  const [pages, setPages] = useState<Record<string, any>>({
    totalPages: 0,
    last: false,
    first: true,
    empty: false,
    number: 0,
  });
  const [filters, setFilters] = useState<Record<string, any>>({
    activityType: '',
    activityCategory: '',
    appName: '',
    url: '',
    confirmed: '',
    startTime: '',
    endTime: '',
  });

  const resetPage = () => {
    setPages({ ...pages, number: 0 })
  }

  const formatQueryString = useCallback((): string => {
    let query = `?page=${pages.number}&size=10`;

    const { activityType, activityCategory, appName, url, confirmed, startTime, endTime } = filters;

    if (activityType) {
      query += `&activityType=${activityType}`;
    }

    if (activityCategory) {
      query += `&activityCategory=${activityCategory}`;
    }

    if (appName) {
      query += `&appName=${appName}`;
    }

    if (url) {
      query += `&url=${url}`;
    }

    if (confirmed !== null) {
      query += `&confirmed=${confirmed}`;
    }

    if (startTime) {
      query += `&startTime=${startTime}`;
    }

    if (endTime) {
      query += `&endTime=${endTime}`;
    }

    return query;
  }, [filters, pages.number]);

  useEffect(() => {
    const query = formatQueryString();

    apiInstance.get(`/activity${query}`)
      .then(response => {
        const { content, totalPages, last, first, empty, number } = response.data

        setActivity(content || []);
        setPages({
          totalPages,
          last,
          first,
          empty,
          number
        })
      })
      .catch(error => {
        console.error(error);
      })
  }, [formatQueryString]);

  const handleChangeActivityCategory = (id: number, value: string | null) => {
    if (value === null) {
      return;
    }

    apiInstance.post(`/activity/${id}?activityCategory=${value}`)
      .then(() => {
        setActivity((prevActivity) =>
          prevActivity.map((activityItem) =>
            activityItem.id === id
              ? { ...activityItem, activityCategory: value }
              : activityItem
          )
        );
      })
      .catch(error => console.error(error))
  }

  return (
    <>
      <Container>
        <Flex direction="row">
          <Input onChange={(event) => { setFilters({ ...filters, appName: event.target.value }); resetPage(); }} style={{ width: "100%", padding: "0 5px 0 0" }} placeholder="Название приложения" />
          <Input onChange={(event) => { setFilters({ ...filters, url: event.target.value }); resetPage(); }} style={{ width: "100%", padding: "0 0 0 5px" }} width="100%" placeholder="URL сайта" />
        </Flex>

        <Accordion>
          <Accordion.Item value="Показать еще">
            <Accordion.Control style={{ maxHeight: "30px" }}><Text size="sm">Фильтры</Text></Accordion.Control>
            <Accordion.Panel>
              <Select placeholder="Тип активности"
                data={[
                  {
                    value: 'WEBSITE', label: 'Сайт'
                  },
                  {
                    value: 'APPLICATION', label: 'Приложение'
                  }
                ]}
                onChange={(value) => { setFilters({ ...filters, activityType: value }); resetPage() }}
                clearable
              />
              <Space h="md" />
              <Select placeholder="Категория активности"
                data={[
                  {
                    value: 'UNDEFINED', label: 'Неопределено'
                  },
                  {
                    value: 'ENTERTAINMENT', label: 'Развлечение'
                  },
                  {
                    value: 'EDUCATION', label: 'Образование'
                  }
                ]}
                onChange={(value) => { setFilters({ ...filters, activityCategory: value }); resetPage() }}
                clearable
              />
              <Space h="md" />
              <Select placeholder="Проголосовали"
                data={[
                  {
                    value: 'true', label: 'Проголосовали'
                  },
                  {
                    value: 'false', label: 'Не проголосовали'
                  }
                ]}
                onChange={(value) => { setFilters({ ...filters, confirmed: value }); resetPage() }}
                clearable
              />
              <Space h="md" />
              <DateTimePicker clearable placeholder="Время начала" onChange={(value) => { setFilters({ ...filters, startTime: value ? new Date(String(value)).toISOString() : '' }); resetPage(); }} />
              <Space h="md" />
              <DateTimePicker clearable placeholder="Время конца" onChange={(value) => { setFilters({ ...filters, endTime: value ? new Date(String(value)).toISOString() : '' }); resetPage() }} />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                ID
              </Table.Th>
              <Table.Th>
                Тип активности
              </Table.Th>
              <Table.Th>
                Категория активности
              </Table.Th>
              <Table.Th>
                Название приложения/Адрес сайта
              </Table.Th>
              <Table.Th>
                Время
              </Table.Th>
              <Table.Th>
                Проголосовали
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {
              // @ts-ignore
              activity.map(({ id, activityType, activityCategory, time, confirmed, ...props }) => (
                <Table.Tr key={id}>
                  <Table.Td>
                    {id}
                  </Table.Td>
                  <Table.Td>
                    {activityType === "APPLICATION" ? "Приложение" : "Сайт"}
                  </Table.Td>
                  <Table.Td>
                    <Select
                      placeholder="Выберите категорию активности"
                      data={[
                        {
                          value: 'UNDEFINED', label: 'Неопределено'
                        },
                        {
                          value: 'ENTERTAINMENT', label: 'Развлечение'
                        },
                        {
                          value: 'EDUCATION', label: 'Образование'
                        }
                      ]}
                      value={activityCategory}
                      onChange={(value) => handleChangeActivityCategory(id, value)}
                    />
                  </Table.Td>
                  <Table.Td style={{ maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {activityType === "APPLICATION" ? props.appName : props.url}
                  </Table.Td>
                  <Table.Td>
                    {new Date(time).toLocaleString()}
                  </Table.Td>
                  <Table.Td>
                    {String(confirmed)}
                  </Table.Td>
                </Table.Tr>
              ))
            }
          </Table.Tbody>
        </Table>
      </Container>
      <Space h="md" />
      <Container>
        <Pagination total={pages.totalPages} onChange={(value) => setPages({ ...pages, number: value - 1 })} />
      </Container>
    </>
  )
}