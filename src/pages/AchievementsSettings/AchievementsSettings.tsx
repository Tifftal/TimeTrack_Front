import { Badge, Button, Chip, Flex, Group, Modal, NativeSelect, NumberInput, Table, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import './styles.scss'
import { useEffect, useState } from "react";
import { apiInstance } from "../../api/apiInstance";
import { Achievement } from "./type";

const AchievementsSettings = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [categories, setCategories] = useState<string[]>(['EDUCATION', 'WORKING']);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [achievements, setAchievements] = useState<Achievement[]>([]);

    useEffect(() => {
        apiInstance.get('/achievements')
            .then(res => {
                console.log(res)
                setAchievements(res.data.content)
            })
            .catch(e => {
                console.error(e)
            })
    }, [])

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            description: '',
            achievementType: 'WEBSITE',
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

    const handleAddAchievement = (values: any) => {
        apiInstance.post('/achievements', values)
            .then(res => {
                console.log(res)
            })
            .catch(e => {
                console.error(e)
            })
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
                    <NativeSelect
                        label="Тип достижения"
                        data={['WEBSITE', 'DESKTOP']}
                        key={form.key('achievementType')}
                        {...form.getInputProps('achievementType')}
                    />
                    <NumberInput
                        label="Длительность"
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
                            categories.map((item, index) => (
                                <Chip
                                    size="xs"
                                    key={index}
                                    variant="light"
                                    onClick={() => handleChipClick(item)}
                                    color={selectedItems.includes(item) ? '' : 'gray'}
                                >
                                    {item}
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
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Название</Table.Th>
                        <Table.Th>Описание</Table.Th>
                        <Table.Th>Длительность</Table.Th>
                        <Table.Th>Алмазы</Table.Th>
                        <Table.Th>Тип</Table.Th>
                        <Table.Th>Категории</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {
                        achievements.map((item: Achievement, index: number) => (
                            <Table.Tr key={index}>
                                <Table.Td>{item.name}</Table.Td>
                                <Table.Td>{item.description}</Table.Td>
                                <Table.Td>{item.duration}</Table.Td>
                                <Table.Td>{item.rewardDiamonds}</Table.Td>
                                <Table.Td>{item.achievementType}</Table.Td>
                                <Table.Td>
                                    {item.categoryList.map((item, index) => (
                                        <Badge variant="light" key={index}>{item}</Badge>
                                    ))}
                                </Table.Td>
                            </Table.Tr>
                        ))
                    }
                </Table.Tbody>
            </Table>
        </div>
    )
}

export default AchievementsSettings;