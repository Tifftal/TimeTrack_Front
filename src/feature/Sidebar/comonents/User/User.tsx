import { Avatar, Button, Flex } from "@mantine/core"
import { useNavigate } from "react-router-dom"

export const User = () => {
  const navigate = useNavigate();

  return (
    <div style={{width: '100%'}}>
      <Flex
        align="center"
        direction="row"
        gap={10}
        style={{ width: "100%" }}
      >
        <div>
          <Avatar
            radius="xl"
            alt="No image"
            color="initials"
          />
        </div>
        <div>
          <h4>Ivan Ivanov</h4>
          <p>iivanov@yandex.ru</p>
        </div>
      </Flex>
      <div>
        <Button fullWidth mt={20} onClick={()=>{navigate('/auth'); localStorage.clear()}}>Выйти</Button>
      </div>
    </div>
  )
}