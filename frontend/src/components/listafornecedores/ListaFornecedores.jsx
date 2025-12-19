import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FornecedorDAO from '../../objetos/dao/FornecedorDAO';

const ListaFornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const navigate = useNavigate();
  const dao = new FornecedorDAO();

  const carregar = async () => setFornecedores(await dao.listar());
  useEffect(() => { carregar(); }, []);

  const excluir = async (id) => {
    if (window.confirm('Excluir este fornecedor?')) {
      await dao.excluir(id);
      carregar();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Fornecedores</h2>
        <button onClick={() => navigate('/fornecedor/novo')} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">
          + Novo Fornecedor
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold text-slate-700">Razão Social</th>
              <th className="p-4 font-bold text-slate-700">CNPJ</th>
              <th className="p-4 font-bold text-slate-700 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {fornecedores.map(f => (
              <tr key={f._id} className="hover:bg-blue-50/50 transition-colors">
                <td className="p-4 text-slate-800 font-medium">{f.nome}</td>
                <td className="p-4 text-slate-600 font-mono text-sm">{f.cnpj}</td>
                <td className="p-4 flex justify-center gap-3">
                  <button onClick={() => navigate(`/fornecedor/editar/${f._id}`)} className="text-blue-600 hover:text-blue-800 font-bold">Editar</button>
                  <button onClick={() => excluir(f._id)} className="text-red-600 hover:text-red-800 font-bold">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaFornecedores;