import { createTheme } from "@mui/material";

const theme = createTheme({

    palette: {
        primary: {
            main: "#6469ff"
        }
    },

    typography: {
       
        fontFamily: "Open Sans",

        h1: {
            fontSize: "calc(2.1em + 2.1vw)",
        },
        h2:{
            fontSize: "calc(1.2em + 1.2vw)",
            
        },
        h6:{
            fontSize:"calc(0.5em + 0.4vw)",
        },
        p:{
            fontSize: "calc(0.8em + 0.8vw)"
        }

    }

})

export default theme