import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#142f56',
        },
        secondary: {
            main: '#b90c0e',
        },
    },
    typography: {
        fontFamily: 'Poppins',
        fontSize: 14,
        h1: {
          fontSize: '3rem',
          fontWeight: 600,
        },
        h2: {
          fontSize: '2.5rem',
          fontWeight: 600,
        },
        h3: {
          fontSize: '2rem',
          fontWeight: 400,
        },
        h4: {
          fontSize: '1.8rem',
        },
        body2: {
          fontSize: '1rem',
        },
        body1: {
          fontSize: '1.0rem',
          fontWeight: 'bold'
        },
    },
});

export default theme