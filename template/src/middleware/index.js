import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LoggingProvider } from './middleware/LoggingProvider';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoggingProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoggingProvider>
  </React.StrictMode>
);

