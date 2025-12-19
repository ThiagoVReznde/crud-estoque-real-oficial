// src/App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './layout/MainLayout.jsx';
import AppRoutes from './routes/AppRoutes.jsx'; // Renomeamos de ProdutoRoutes para AppRoutes

function App() {
  return (
    <BrowserRouter>
      {/* O MainLayout envolve tudo para que o Menu e o Footer apareçam em todas as páginas */}
      <MainLayout>
        {/* Container para garantir que o conteúdo use a largura total disponível */}
        <div className="w-full animate-fadeIn">
          {/* O AppRoutes agora gerencia: /, /fornecedores e /unidades */}
          <AppRoutes />
        </div>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;