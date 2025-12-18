import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importação dos Componentes (Telas)
import ListaProdutos from '../components/listaprodutos/ListaProdutos';
import ProdutoForm from '../components/cadastraproduto/ProdutoForm';

const ProdutoRoutes = () => {
  return (
    <Routes>
      {/* Rota 1: Listagem (Página inicial do módulo de produtos) */}
      <Route path="/" element={<ListaProdutos />} />

      {/* Rota 2: Cadastro de Novo Produto */}
      <Route path="/cadastrar" element={<ProdutoForm />} />

      {/* Rota 3: Edição (Recebe o ID pela URL) */}
      <Route path="/editar/:id" element={<ProdutoForm />} />
    </Routes>
  );
};

export default ProdutoRoutes;
