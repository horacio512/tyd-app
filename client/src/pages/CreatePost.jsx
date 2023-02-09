import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from "../assets"
import { getRandomPrompt } from "../utils"
import { FormField, Loader } from "../components"
import { Container, ThemeProvider } from '@mui/system'
import theme from '../assets/MuiTheme'
import { Box, Button, Grid, Link, Typography } from '@mui/material'

const CreatePost = () => {

  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  })

  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.prompt && form.photo) {
      setLoading(true)
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form)
        })
        await response.json()
        navigate("/")
      } catch (err) {
        alert(err)
      } finally {
        setLoading(false)
      }
    } else {
      alert("Ingrese datos")
    }

  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({ ...form, prompt: randomPrompt })
  }

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true)
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ prompt: form.prompt }),
        })

        const data = await response.json()

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
      } catch (error) {
        alert(error)
      }
      finally {
        setGeneratingImg(false)
      }
    } else {
      alert("Por favor ingrese datos")
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>

        <Grid container maxHeight="calc(100vh-18px)" justifyContent="center">
          <Grid item mt={5} xs={12} textAlign="center">
            <Typography variant="h1" fontWeight={600}> Crear </Typography>
          </Grid>
          <Grid item mt={3} xs={12} textAlign="center">
            <Typography variant="p" sx={{ opacity: "0.8" }}> Cree a través de una colección de imágenes visualmente impactantes generadas a través de </Typography>
            <Typography variant="p" fontWeight={600} ><Link target="_blank" href='https://openai.com/'>DALL-E AI</Link></Typography>
            <Typography variant="p" sx={{ opacity: "0.8" }}> y compártelas con la comunidad</Typography>
          </Grid>

          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <FormField labelName="Tu Nombre" type="text" name="name" placeholder="Juan Manuel" value={form.name} handleChange={handleChange} />

              <FormField labelName="Prompt" type="text" name="prompt" placeholder="panda mad scientist mixing sparkling chemicals, digital art" value={form.prompt}
                handleChange={handleChange} isSurpriseMe handleSurpriseMe={handleSurpriseMe} />
              <Box mt={3}>
                <Button type="submit" size="large" variant="contained">
                  {
                    loading ? "Compartiendo...." : "Compartir con la comunidad"
                  }
                </Button>
              </Box>
            </form>
          </Grid>

          <Grid item xs={10} sm={10} md={6} lg={8} display="flex" justifyContent="center" alignItems="center" mt={4}>
            {
              form.photo ? (
                <Grid item xs={12} sm={8}>
                  <img src={form.photo} alt={form.prompt} height="auto" width="100%" />
                </Grid>
              ) : (
                <Grid item xs={10} sm={6} md={6} lg={6} sx={{ opacity: "0.7" }}>
                  <img src={preview} alt="preview" className="image" height="auto" width="100%" />
                </Grid>
              )
            }
            {generatingImg && (
              <Grid item xs={12} position="absolute" sx={{ backgroundColor: "rgba(0,0,0,0.5)" }} p="10%" borderRadius={10}>
                <Loader />
              </Grid>
            )}
          </Grid>
          <Grid item xs={12} justifyContent="center" display="flex" >
            <Button color="success" variant="contained" sx={{ fontSize: "calc(0.8em + 1vw)" }} size="large" onClick={generateImage}>{generatingImg ? "Generando..." : "Generar"}</Button>

          </Grid>
          <Grid item xs={12} mt={2} mb={4} textAlign="center">
            <Typography variant="p" sx={{ opacity: "0.9" }}> Una vez que hayas creado tu imagen, puedes compartirla con otros en la comunidad!. </Typography>

          </Grid>
        </Grid>



      </Container>
    </ThemeProvider>
  )
}

export default CreatePost