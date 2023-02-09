import React from 'react'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import { logo } from "./assets"
import { Home, CreatePost } from "./pages"
import { AppBar, Box, Button, Grid, ThemeProvider } from "@mui/material"
import theme from "./assets/MuiTheme"

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>

      {/*Barra de navegación*/}
        <AppBar sx={{ backgroundColor: "white" }} position="sticky">
          <Grid container borderBottom={2} borderColor="#e6ebf4" px={2} py={2} justifyContent="space-between" alignItems="center" >
            <Grid item xs={2}>
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </Grid>

            <Grid item px={2} py={2} >
              <Link to="/create-post" style={{ textDecoration: 'none' }}>
                <Button variant="contained" size="large"> Create </Button>
              </Link>
            </Grid>
          </Grid>
        </AppBar>

        <Grid container display="flex" height="calc(100vh-70px)" color="secondary">


      {/*Rutas*/}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>

        </Grid>

      </BrowserRouter>
    </ThemeProvider >
  )
}

export default App