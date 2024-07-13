import { CSSTransition } from "react-transition-group";
import { Button, Flex, Menu } from "@mantine/core";
import { CrossIcon } from "../../assets/icons/CrossIcon";
import { useNavigate } from "react-router-dom";
import { User } from "./comonents/User/User";
import { Props } from "./types";
import {
  IconChevronRight,
  IconHome,
  IconShoppingBag,
  IconSquareCheck,
  IconStack2 as IconStack,
  IconMenu3 as IconMenu,
  IconChartBarPopular as IconChartBar,
  IconSettings,
} from "@tabler/icons-react";

import cn from "classnames";
import "./ui/styles.scss";

export const SideBar: React.FC<Props> = ({
  isOpen,
  setIsOpen
}) => {
  const navigate = useNavigate();

  return (
    <>
      <CSSTransition
        timeout={200}
        classNames='sidebar'
        in={isOpen}
      >
        <div className='sidebar'>
          <Flex
            align="flex-start"
            direction="column"
            className='sidebar-wrapper'
          >
            <Flex
              align="flex-start"
              direction="row"
              className="sidebar-logo"
            >
              <Button
                size="xs"
                className="sidebar-close-btn"
                onClick={() => setIsOpen(false)}
              >
                <CrossIcon />
              </Button>
            </Flex>
            <Button
              size="lg"
              className={cn('sidebar-link', { 'sidebar-link_active': window.location.pathname.includes('/task') })}
              onClick={() => navigate('/home/tasks')}
              leftSection={<IconHome />}
            >
              Задания
            </Button>
            <Button
              className={cn('sidebar-link', { 'sidebar-link_active': window.location.pathname.includes('/shop') })}
              size="lg"
              onClick={() => navigate('/home/market')}
              leftSection={<IconShoppingBag />}
            >
              Магазин
            </Button>
            <Button
              size="lg"
              className={cn('sidebar-link', { 'sidebar-link_active': window.location.pathname.includes('/achievements') })}
              onClick={() => navigate('/home/achievements')}
              leftSection={<IconSquareCheck />}
            >
              Мои достижения
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
                  size="lg"
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
                <Menu.Item className='sidebar-link'>
                  <Button
                    size="md"
                    className="sidebar-link"
                    leftSection={<IconChartBar />}
                  >
                    Статистика
                  </Button>
                </Menu.Item>
                <Menu.Item className='sidebar-link'>
                  <Button
                    size="md"
                    className="sidebar-link"
                    leftSection={<IconMenu />}
                  >
                    Категории
                  </Button>
                </Menu.Item>
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
      </CSSTransition >
    </>
  )
}