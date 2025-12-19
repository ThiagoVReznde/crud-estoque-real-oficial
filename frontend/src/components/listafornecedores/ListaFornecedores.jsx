import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FornecedorDAO from '../../objetos/dao/FornecedorDAO';

const ListaFornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const navigate = useNavigate();
  const dao = new FornecedorDAO();

  const carregarFornecedores = async () => {
    const dados = await dao.listar();
    setFornecedores(dados);
  };

  useEffect(() => {
    carregarFornecedores();
  }, []);

  const excluirFornecedor = async (id) => {
    if (window.confirm('Deseja realmente excluir este fornecedor?')) {
      await dao.excluir(id);
      carregarFornecedores();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* CABEÇALHO PADRONIZADO */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">🚚 Fornecedores</h2>
          <p className="text-slate-500 text-sm font-medium">Gestão de parceiros e empresas cadastradas</p>
        </div>

        <button 
          onClick={() => navigate('/fornecedor/novo')} 
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center gap-2 active:scale-95"
        >
          <span className="text-xl">+</span> Novo Fornecedor
        </button>
      </div>

      {/* TABELA ORGANIZADA E CENTRALIZADA */}
      <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-bold text-slate-700 text-sm uppercase tracking-wider">Razão Social</th>
                <th className="p-4 font-bold text-slate-700 text-sm uppercase tracking-wider">CNPJ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fornecedores.map((f) => (
                <tr key={f._id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="p-4 text-slate-800 font-medium">{f.nome}</td>
                  <td className="p-4 text-slate-600 font-mono text-sm">{f.cnpj}</td>
                  <td className="p-4">
                    <div className="flex justify-center gap-4">
                      <button 
                        onClick={() => navigate(`/fornecedor/editar/${f._id}`)}
                        className="text-blue-600 hover:text-blue-800 font-bold text-sm transition-colors"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => excluirFornecedor(f._id)}
                        className="text-red-500 hover:text-red-700 font-bold text-sm transition-colors"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MENSAGEM CASO VAZIO */}
      {fornecedores.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-medium">Nenhum fornecedor cadastrado.</p>
        </div>
      )}
    </div>
  );
};

export default ListaFornecedores;