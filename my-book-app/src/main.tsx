import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // Keep your global styles if needed
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 

// --- Mantine Imports ---
import { MantineProvider } from '@mantine/core';
// Import Mantine core styles - REQUIRED
import '@mantine/core/styles.css'; 
// --- End Mantine Imports ---


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Wrap everything with MantineProvider */}
      <MantineProvider defaultColorScheme="auto"> {/* Or "light" / "dark" */}
        <AuthProvider> 
          <App />
        </AuthProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);