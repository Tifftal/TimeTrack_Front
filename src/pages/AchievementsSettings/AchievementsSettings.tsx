import { Badge, Button, Chip, ComboboxItem, Flex, Group, Modal, NumberInput, Pagination, Select, Table, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import './styles.scss'
import { useEffect, useState } from "react";
import { apiInstance } from "../../api/apiInstance";
import { Achievement } from "./type";

const AchievementsSettings = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [categories] = useState<string[]>(['EDUCATION', 'ENTERTAINMENT', 'UNDEFINED']);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [activePage, setPage] = useState<number>(1);
    const [sort, setSort] = useState<ComboboxItem | null>(null);

    const translations: Record<string, string> = {
        "EDUCATION": "Образование",
        "ENTERTAINMENT": "Развлечение",
        "UNDEFINED": "Неопределено"
    };

    useEffect(() => {
        let url = `/achievements?page=${activePage - 1}&size=10`
        if (sort !== null) {
            url += `&sort=${sort.value}`
        }
        apiInstance.get(url)
            .then(res => {
                setAchievements(res.data.content)
                setTotal(res.data.totalPages)
            })
            .catch(e => {
                console.error(e)
            })
    }, [sort])

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            description: '',
            achievementType: 'TARGET_CATEGORY',
            duration: 0,
            rewardDiamonds: 0,
            categoryList: [] as string[],
        },
    });

    const handleChipClick = (item: string) => {
        setSelectedItems((prevSelected) => {
            if (prevSelected.includes(item)) {
                const result = prevSelected.filter((selectedItem) => selectedItem !== item)
                form.setValues({ categoryList: result });
                return result;
            } else {
                const result = [...prevSelected, item]
                form.setValues({ categoryList: result });
                return result;
            }
        });
    };

    const handleAddAchievement = (values: Record<string, any>) => {
        const formattedValues = { ...values, duration: values.duration * 1000 * 60 * 60 };

        apiInstance.post('/achievements', formattedValues)
            .then(res => {
                console.log(res)
            })
            .catch(e => {
                console.error(e)
            })

        close();
    }

    return (
        <div className="ach-settings">
            <Modal opened={opened} onClose={close} title="Новое достижение">
                <form onSubmit={form.onSubmit((values) => handleAddAchievement(values))} className="ach-settings-form">
                    <TextInput
                        label="Название"
                        placeholder="Достижение"
                        key={form.key('name')}
                        {...form.getInputProps('name')}
                    />
                    <TextInput
                        label="Описание"
                        placeholder="Тут описание"
                        key={form.key('description')}
                        {...form.getInputProps('description')}
                    />
                    <NumberInput
                        label="Длительность (в часах)"
                        placeholder='1'
                        key={form.key('duration')}
                        {...form.getInputProps('duration')}
                    />
                    <NumberInput
                        label="Количество алмазов"
                        placeholder='10'
                        key={form.key('rewardDiamonds')}
                        {...form.getInputProps('rewardDiamonds')}
                    />
                    <Flex
                        direction={'row'}
                        gap={5}
                        mt={10}
                    >
                        {
                            categories.map((item: string, index: number) => (
                                <Chip
                                    size="xs"
                                    key={index}
                                    variant="light"
                                    onClick={() => handleChipClick(item)}
                                    color={selectedItems.includes(item) ? '' : 'gray'}
                                >
                                    {translations[item]}
                                </Chip>
                            ))
                        }
                    </Flex>
                    <Group justify="flex-end" mt="md">
                        <Button type="submit">Добавить</Button>
                    </Group>
                </form>
            </Modal>
            <Button
                color="lime"
                rightSection={<IconPlus />}
                style={{ cursor: 'pointer' }}
                onClick={open}
                mb={10}
            >
                Создать новое достижение
            </Button>
            <Select
                data={[{ value: 'ASC', label: 'возрастанию' }, { value: 'DESC', label: 'убыванию' }]}
                value={sort ? sort.value : null}
                onChange={(_value, option) => { setSort(option); console.log(option) }}
                label='Сортировать по'
                placeholder="Не выбрано"
                w='fit-content'
            />
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Название</Table.Th>
                        <Table.Th>Описание</Table.Th>
                        <Table.Th>Длительность (в часах)</Table.Th>
                        <Table.Th>Алмазы</Table.Th>
                        <Table.Th>Категории</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {
                        achievements.map((item: Achievement, index: number) => (
                            <Table.Tr key={index}>
                                <Table.Td>{item.name}</Table.Td>
                                <Table.Td>{item.description}</Table.Td>
                                <Table.Td>{(item.duration / (1000 * 60 * 60)).toFixed(2)}</Table.Td>
                                <Table.Td>{item.rewardDiamonds}</Table.Td>
                                <Table.Td style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {item.categoryList.sort().map((item, index) => (
                                        <Badge
                                            variant="light"
                                            key={index}
                                            color={item === 'EDUCATION' ? 'lime' : item === 'ENTERTAINMENT' ? 'yellow' : 'gray'}
                                        >
                                            {translations[item]}
                                        </Badge>
                                    ))}
                                </Table.Td>
                            </Table.Tr>
                        ))
                    }
                </Table.Tbody>
            </Table>
            <Pagination total={total} value={activePage} onChange={setPage} mt="sm" />
        </div>
    )
}

export default AchievementsSettings;