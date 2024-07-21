import { Avatar, Button, Flex, Skeleton, Space } from "@mantine/core"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { apiInstance } from "../../../../api/apiInstance";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../../store/userSlice/userSlice";
import { selectUserState } from "../../../../store/userSlice/userSelector";

export const User = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { username, name, surname } = useSelector(selectUserState);

  const isLoaded = !!(username && name && surname);

  useEffect(() => {
    apiInstance.get('/user/me')
      .then((response) => {
        dispatch(setUser(response.data));
      })
      .catch(error => {
        console.error(error);
      })
  }, []);

  // TODO: Add Skeleton onload
  return (
    <div style={{ width: '100%' }}>
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
          {!isLoaded ? (
            <>
              <Skeleton animate={true} height={8} width={150} radius="xl" />
              <Space h="md" />
              <Skeleton animate={true} height={8} width={100} radius="xl" />
            </>
          ) : (
            <>
              <h4>{surname} {name}</h4>
              <p>{username}</p>
            </>
          )}
        </div>
      </Flex>
      <div>
        <Button fullWidth mt={20} onClick={() => { navigate('/auth'); localStorage.clear() }}>Выйти</Button>
      </div>
    </div>
  )
}