import { Avatar, Button, Flex, Group, Space } from "@mantine/core"
import React from "react"
import { Props } from "./types"
import { IconDiamond, IconSnowflake } from "@tabler/icons-react"
import { useDispatch, useSelector } from "react-redux"
import { selectUserState } from "../../../../store/userSlice/userSelector"
import { apiInstance } from "../../../../api/apiInstance"
import { notifications } from "@mantine/notifications"
import { addFreeze } from "../../../../store/userSlice/userSlice"

export const Product: React.FC<Props> = ({
  src = '',
  name,
  description = '',
  price,
}) => {
  const { userInventory: { diamonds } } = useSelector(selectUserState);
  const dispatch = useDispatch();

  const handleBuy = () => {
    apiInstance.post('/store/buy-freeze')
      .then(() => {
        notifications.show({
          title: 'Покупка прошла успешно',
          message: 'Заморозка приобретена',
          position: 'top-right',
          color: 'lime',
          autoClose: 3000,
        })
        dispatch(addFreeze())
      })
      .catch(e => {
        console.error(e)
        notifications.show({
          title: 'Ошибка покупки',
          message: 'Недостаточно алмазов для покупки',
          position: 'top-right',
          color: 'red',
          autoClose: 3000,
        })
      })
  }

  return (
    <>
      <Space h="xs" />
      <Flex
        direction="row"
        justify="space-between"
        align="flex-end"
      >
        <Group>
          <Avatar
            color="blue"
            radius="xl"
            size="lg"
            src={src}
            alt="Product image"
            style={{ marginRight: "10px" }}
          >
            <IconSnowflake size="1.8rem" />
          </Avatar>

          <Flex
            direction="column"
            style={{ justifyContent: 'space-between', padding: '0 10px' }}
          >
            <h3>{name}</h3>
            <p>{description}</p>
          </Flex>
        </Group>

        <Button
          variant="outline"
          color="blue"
          leftSection={
            <IconDiamond />
          }
          disabled={Number(price) > diamonds}
          onClick={handleBuy}
        >
          {price}
        </Button>
      </Flex>
    </>
  )
}