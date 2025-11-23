import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { unmessTheme } from '@unmessme/design-system';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={unmessTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

