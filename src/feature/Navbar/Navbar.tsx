import { ActionIcon, Button, Flex, Group, Tooltip } from "@mantine/core";
import { IconMenu2 as IconNavbarMenu, IconBell, IconFlame, IconDiamond, IconSnowflake } from "@tabler/icons-react";
import { Props } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { selectUserState } from "../../store/userSlice/userSelector";
import { apiInstance } from "../../api/apiInstance";
import { setUser } from "../../store/userSlice/userSlice";
import { useEffect, useState } from "react";

export const Navbar: React.FC<Props> = ({
  setIsOpen
}) => {
  const [timeLeft, setTimeLeft] = useState('');

  const dispatch = useDispatch();
  const { userInventory: { diamonds, freezing }, userStatistics: { durationOfShockMode, freezeStatus, freezeTill } } = useSelector(selectUserState)

  const durationOfShockModeInDays = (() => {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    return Math.floor(durationOfShockMode / millisecondsPerDay);
  })();

  const isFreezeActive = freezeStatus === "ACTIVE";

  const handleActivateFreeze = () => {
    apiInstance.post("/user/me/freeze")
      .then((response) => {
        dispatch(setUser(response.data))
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    if (isFreezeActive && freezeTill) {
      const interval = setInterval(() => {
        const now = new Date();
        const freezeDate = new Date(freezeTill);

        const diff = Number(freezeDate) - Number(now);

        if (diff <= 0) {
          setTimeLeft(`Заморозок осталось: ${freezing}`);
          clearInterval(interval)
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          setTimeLeft(`Активна ${hours}ч ${minutes}м ${seconds}с`)
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setTimeLeft(`Заморозок осталось: ${freezing}`)
    }
  }, [freezeTill, freezing, isFreezeActive])

  return (
    <Flex
      direction="row"
      color="transparent"
      justify="space-between"
      style={{ padding: "10px" }}
    >
      <ActionIcon
        onClick={() => setIsOpen(false)}
        size="lg"
      >
        <IconNavbarMenu />
      </ActionIcon>

      <Group gap="md">
        <Button
          bg="white"
          size="sm"
          style={{
            color: "black",
            width: "auto",
            padding: "0 5px"
          }}
        >
          <IconBell />
        </Button>

        <Tooltip label={timeLeft}>
          <Button
            bg="white"
            style={{
              color: "dodgerblue"
            }}
            leftSection={
              <IconSnowflake />
            }
            disabled={isFreezeActive || !freezing}
            onClick={() => handleActivateFreeze}
          >
            {isFreezeActive ? "Активна" : "Заморозить"}
          </Button>
        </Tooltip>


        <Button
          bg="white"
          style={{
            color: "orange"
          }}
          leftSection={
            <IconFlame />
          }
        >
          {durationOfShockModeInDays}
        </Button>

        <Button
          bg="white"
          style={{
            color: "dodgerblue"
          }}
          leftSection={
            <IconDiamond />
          }
        >
          {diamonds}
        </Button>
      </Group>
    </Flex >
  )
}