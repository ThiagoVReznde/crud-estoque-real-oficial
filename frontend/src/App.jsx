import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './layout/MainLayout.jsx';
import AppRoutes from './routes/AppRoutes.jsx'; 

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;