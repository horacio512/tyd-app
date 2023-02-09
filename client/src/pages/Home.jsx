import { Grid, Link, Typography } from '@mui/material'
import { Container, ThemeProvider } from '@mui/system'
import React, { useState, useEffect } from 'react'
import theme from '../assets/MuiTheme'
import { Loader, Cards, FormField } from "../components"

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (<Grid container justifyContent="space-evenly">
      {data.map((post) => <Cards key={post._id} {...post} />)}</Grid>)
  }
  return (
    <Typography variant="h2" mt={5}>{title}</Typography>
  )
}

const Home = () => {

  const [loading, setLoading] = useState(false)
  const [allPosts, setAllPosts] = useState(null)
  const [searchText, setSearchText] = useState("")
  const [searchResults, setSearchResults] = useState(null)
  const [searchTimeout, setSearchTimeout] = useState(null)

  const fetchPost = async () => {
    setLoading(true)
    try {
      const response = await fetch("http://localhost:8080/api/v1/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const result = await response.json()

        setAllPosts(result.data.reverse())
      }
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [])

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()))
        setSearchResults(searchResult);
      }, 500),
    )
  }


  return (
    <ThemeProvider theme={theme}>
      <Container>

        <Grid container maxHeight="calc(100vh-18px)">
          <Grid item mt={5} xs={12} textAlign="center">
            <Typography variant="h1" fontWeight={600}> La Comunidad </Typography>
          </Grid>

          <Grid item mt={3} xs={12} textAlign="center">
            <Typography variant="p" sx={{ opacity: "0.8" }}> Navegue a través de una colección de imágenes visualmente impactantes generadas por </Typography>
            <Typography variant="p" fontWeight={600}><Link href='https://openai.com/' target="_blank" >DALL-E AI</Link></Typography>
          </Grid>

          <Grid item xs={12} mt={5} justifyContent="center" textAlign="center" >
            <FormField labelName="Buscar Posteos" type="text" name="text" placeholder="Buscar" value={searchText} handleChange={handleSearchChange} />
          </Grid>

          <Grid item xs={12} mt={10} display="flex" justifyContent="center">
            {loading ? (<Loader />) :
              (
                <>
                  {searchText && (
                    <Grid item xs={6}>
                      <Typography variant="h2" fontWeight={400}>Mostrando resultados para.... </Typography>
                      <Typography variant="h2" fontWeight={400}>{searchText}</Typography>
                    </Grid>
                  )}
                  <Grid container>
                    <Grid item >
                      {searchText ? (
                        <RenderCards data={searchResults} title="No se encontraron resultados." />
                      ) : <RenderCards data={allPosts} title="No se encontraron posteos." />}
                    </Grid>
                  </Grid>
                </>
              )}
          </Grid>



        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default Home