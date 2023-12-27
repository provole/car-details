import React from 'react';
import './App.scss';
import { CssBaseline } from '@mui/material';
import darkScrollbar from "@mui/material/darkScrollbar";
import { ThemeProvider } from "@mui/material/styles";
import theme from './Theme';

import CarDetails from './components/CarDetails';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CarDetails />
    </ThemeProvider>
  );
}

export default App;
