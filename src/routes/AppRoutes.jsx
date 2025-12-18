// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListaProdutos from '../components/listaprodutos/ListaProdutos';
import ProdutoForm from '../components/cadastraproduto/ProdutoForm';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ListaProdutos />} />
      <Route path="/cadastrar" element={<ProdutoForm />} />
      {/* Rota futura para edição: <Route path="/editar/:id" element={<ProdutoForm />} /> */}
    </Routes>
  );
};

export default AppRoutes;
