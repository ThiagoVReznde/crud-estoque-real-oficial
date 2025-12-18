// src/App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './layout/MainLayout.jsx';
import ProdutoRoutes from './routes/ProdutoRoutes.jsx'; // Importa o arquivo acima

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        {/* Aqui carregamos as rotas de produtos dentro do layout padrão */}
        {/* O '*' significa: qualquer coisa que comece com /produtos/ vai para ProdutoRoutes */}
        <div style={{ width: '100%' }}>
          <ProdutoRoutes />
        </div>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
