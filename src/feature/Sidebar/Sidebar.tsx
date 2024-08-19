import { Button, Flex, Menu } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { User } from "./comonents/User/User";
import {
  IconChevronRight,
  IconHome,
  IconShoppingBag,
  IconSquareCheck,
  IconStack2 as IconStack,
  IconChartBarPopular as IconChartBar,
  IconSettings,
  IconStars,
} from "@tabler/icons-react";

import cn from "classnames";
import "./ui/styles.scss";
import { useSelector } from "react-redux";
import { selectUserType } from "../../store/userSlice/userSelector";

export const SideBar = () => {
  const navigate = useNavigate();
  const userType = useSelector(selectUserType);

  return (
    <>
      <div className='sidebar'>
        <Flex
          align="flex-start"
          direction="column"
          className='sidebar-wrapper'
          gap={5}
        >
          <Flex
            align="flex-start"
            direction="row"
            className="sidebar-logo"
          >
          </Flex>
          <Button
            size="md"
            className={cn('sidebar-link', { 'sidebar-link_active': window.location.pathname.includes('/task') })}
            onClick={() => navigate('/home/tasks')}
            leftSection={<IconHome />}
          >
            Задания
          </Button>
          <Button
            className={cn('sidebar-link', { 'sidebar-link_active': window.location.pathname.includes('/shop') })}
            size="md"
            onClick={() => navigate('/home/market')}
            leftSection={<IconShoppingBag />}
          >
            Магазин
          </Button>
          <Button
            size="md"
            className={cn('sidebar-link', { 'sidebar-link_active': window.location.pathname.includes('/achievements') })}
            onClick={() => navigate('/home/achievements')}
            leftSection={<IconSquareCheck />}
          >
            Профиль
          </Button>

          <Menu
            position="right-start"
            styles={{
              item: {
                padding: 0
              },
              dropdown: {
                width: "200px"
              }
            }}
          >
            <Menu.Target>
              <Button
                size="md"
                className='sidebar-link'
                rightSection={<IconChevronRight />}
                leftSection={<IconStack />}
                styles={{
                }}
              >
                Еще
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              {userType === "ROLE_SYSTEM_ADMIN" && (
                <Menu.Item className='sidebar-link'>
                  <Button
                    size="md"
                    className="sidebar-link"
                    leftSection={<IconChartBar />}
                    onClick={() => navigate('/home/stats')}
                  >
                    Статистика
                  </Button>
                </Menu.Item>
              )}
              {userType === 'ROLE_SYSTEM_ADMIN' && (
                <Menu.Item className='sidebar-link'>
                  <Button
                    size="md"
                    className="sidebar-link"
                    leftSection={<IconStars />}
                    onClick={() => navigate('/home/achievements-settings')}
                  >
                    Достижения
                  </Button>
                </Menu.Item>
              )}
              <Menu.Item className='sidebar-link'>
                <Button
                  size="md"
                  className="sidebar-link"
                  leftSection={<IconSettings />}
                  onClick={() => navigate('/home/settings')}
                >
                  Настройки
                </Button>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
        <Flex>
          <User />
        </Flex>
      </div>
    </>
  )
}