import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { download } from '../assets'
import { downloadImage } from '../utils'
import { ThemeProvider } from '@emotion/react'
import theme from '../assets/MuiTheme'


const Cards = ({ _id, name, prompt, photo }) => {
  return (
    <ThemeProvider theme={theme}>
        <Grid mb={3} item xs={12} md={5} lg={5} justifyContent="center" alignItems="center" sx={{ "&:hover": { "& .testodo": { visibility: "visible" } }, }}>
          <img src={photo} height="auto" width="100%" style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />

          <Grid item xs={12} className='testodo' mt={-1}
            sx={{ backgroundColor: "#30327A", maxHeight: '94.5%', overflowY: 'auto', visibility: 'hidden', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} color="white" >
            <Grid item xs={12} textAlign="end" mt={1} mr={3}>
              <Typography variant="h6" >{prompt} </Typography>
            </Grid>
            <Grid item xs={12} display="flex">
            <Grid item xs={10} display="flex" alignItems="center" ml={2} mb={0.5} >
              <Typography variant="h6" sx={{ backgroundColor: "green",borderRadius: 28 }} fontWeight={500} p={1}>{name[0]}</Typography>
              <Typography variant="h6"> {name}</Typography>
            </Grid>
            <Grid item xs={1} display="flex" justifyContent="end" mr={2}>
              <Button onClick={ ()=>downloadImage(_id,photo)}><img src={download} alt="descarga" height="auto" width="100%"/></Button>
            </Grid>
            </Grid>
          </Grid >


        </Grid>
    </ThemeProvider>

  )
}

export default Cards