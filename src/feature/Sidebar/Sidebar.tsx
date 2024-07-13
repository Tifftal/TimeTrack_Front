import { CSSTransition } from "react-transition-group";
import { Button, Flex } from "@mantine/core";
import { CrossIcon } from "../../assets/icons/CrossIcon";
import { useNavigate } from "react-router-dom";
import { User } from "./comonents/User/User";
import { Props } from "./types";

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
            >
              Задания
            </Button>
            <Button
              className={cn('sidebar-link', { 'sidebar-link_active': window.location.pathname.includes('/shop') })}
              size="lg"
              onClick={() => navigate('/home/market')}
            >
              Магазин
            </Button>
            <Button
              size="lg"
              className={cn('sidebar-link', { 'sidebar-link_active': window.location.pathname.includes('/achievements') })}
              onClick={() => navigate('/home/achievements')}
            >
              Мои достижения
            </Button>
            <Button
              className='sidebar-link'
              size="lg"
            >
              Еще
            </Button>
          </Flex>
          <Flex>
            <User />
          </Flex>
        </div>
      </CSSTransition >
    </>
  )
}