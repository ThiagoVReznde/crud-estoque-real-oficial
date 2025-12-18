import React, { useEffect, useState } from 'react';
import ProdutoDAO from '../../objetos/dao/ProdutoDAO';

const ListaProdutos = () => {
  const [produtos, setProdutos] = useState([]);

  // Instanciando a classe DAO
  const dao = new ProdutoDAO();

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    const dados = await dao.listar();
    setProdutos(dados);
  };

  const excluirProduto = async (id) => {
    if (window.confirm('Deseja realmente excluir?')) {
      await dao.excluir(id);
      carregarProdutos();
    }
  };

  return (
    <div className="grid">
      {produtos.map((prod) => (
        <div key={prod._id} className="card">
          <div className="card-header">
            <h3>{prod.nome}</h3>
            <span className="badge">{prod.unidade?.sigla}</span>
          </div>
          <div className="card-body">
            <p>Fornecedor: {prod.fornecedor?.nome}</p>
            <p>Qtd: {prod.quantidade}</p>
          </div>
          <button
            onClick={() => excluirProduto(prod._id)}
            className="btn-danger"
          >
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListaProdutos;
