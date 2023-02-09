import { Button, Grid, Input, InputLabel } from '@mui/material'
import React from 'react'

const FormField = ({ labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {
  return (
    <Grid container mt={5} justifyContent="start" display="flex">
      <Grid item xs={12} md={7} mb={2}>
        <InputLabel htmlFor={name}>
          {labelName}
        </InputLabel>

        {isSurpriseMe && (
          <Grid item xs={12} my={2}>
            <Button onClick={handleSurpriseMe} variant="outlined" size="large">Sorprendeme</Button>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12} md={6}>
      <Input fullWidth type={type} id={name} name={name} placeholder={placeholder} onChange={handleChange} value={value} required/>
      </Grid>
    </Grid>
  )
}

export default FormField