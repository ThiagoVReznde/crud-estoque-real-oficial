import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importação dos Componentes (Telas)
import ListaProdutos from '../components/listaprodutos/ListaProdutos';
import ProdutoForm from '../components/cadastraproduto/ProdutoForm';

import ListaFornecedores from '../components/listafornecedores/ListaFornecedores';
import FornecedorForm from '../components/cadastrafornecedor/FornecedorForm';

import ListaUnidades from '../components/listaunidades/ListaUnidades';
import UnidadeForm from '../components/cadastraunidade/UnidadeForm';

const AppRoutes = () => {
  return (
    <Routes>
      {/* --- PRODUTOS --- */}
      <Route path="/" element={<ListaProdutos />} />
      <Route path="/produto/novo" element={<ProdutoForm />} />
      <Route path="/produto/editar/:id" element={<ProdutoForm />} />

      {/* --- FORNECEDORES --- */}
      <Route path="/fornecedores" element={<ListaFornecedores />} />
      <Route path="/fornecedor/novo" element={<FornecedorForm />} />
      <Route path="/fornecedor/editar/:id" element={<FornecedorForm />} />

      {/* --- UNIDADES --- */}
      <Route path="/unidades" element={<ListaUnidades />} />
      <Route path="/unidade/novo" element={<UnidadeForm />} />
      <Route path="/unidade/editar/:id" element={<UnidadeForm />} />
    </Routes>
  );
};

export default AppRoutes;