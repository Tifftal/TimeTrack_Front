import { Grid } from "@mantine/core"
import { SideBar } from "../../feature/Sidebar/Sidebar"
import { Outlet } from "react-router-dom"
import { useState } from "react"
import { Navbar } from "../../feature/Navbar/Navbar"

export const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Navbar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <Grid
        columns={12}
      >
        <Grid.Col
          span={{
            xl: 2,
            lg: 2,
            md: 3,
            xs: 0,
          }}
        >
          <SideBar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </Grid.Col>
        <Grid.Col
          span={{
            xl: 8,
            lg: 8,
            md: 6,
            xs: 12,
          }}
        >
          <Outlet />
        </Grid.Col>
        <Grid.Col
          span={{
            xl: 2,
            lg: 2,
            md: 3,
            xs: 0,
          }}
        >

        </Grid.Col>
      </Grid>
    </>
  )
}