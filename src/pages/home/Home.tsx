import { Grid } from "@mantine/core"
import { SideBar } from "../../feature/Sidebar/Sidebar"
import { Outlet } from "react-router-dom"
import { Navbar } from "../../feature/Navbar/Navbar"

export const Home = () => {
  return (
    <>
      <Navbar />
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
          <SideBar />
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