import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FornecedorDAO from '../../objetos/dao/FornecedorDAO';

const ListaFornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dao = new FornecedorDAO();

  const carregarFornecedores = async () => {
    setLoading(true);
    const dados = await dao.listar();
    setFornecedores(dados);
    setLoading(false);
  };

  useEffect(() => {
    carregarFornecedores();
  }, []);

  const excluirFornecedor = async (id) => {
    if (window.confirm('Atenção: A exclusão deste fornecedor pode afetar produtos vinculados. Deseja continuar?')) {
      await dao.excluir(id);
      carregarFornecedores();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center"> {/* Centraliza o conteúdo na tela */}
        
        {/* CABEÇALHO */}
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight text-center md:text-left">Fornecedores</h2>
            <p className="text-slate-500 font-medium text-center md:text-left">Gestão de parceiros cadastrados</p>
          </div>

          <button 
            onClick={() => navigate('/fornecedor/novo')} 
            className="bg-indigo-600 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>+</span> Novo Parceiro
          </button>
        </div>

        {/* TABELA CONDICIONAL: Só aparece se houver dados */}
        {fornecedores.length > 0 ? (
          <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    {/* border-x e border-b criam as divisórias da grade */}
                    <th className="px-6 py-4 text-xs font-black text-slate-600 uppercase border-r border-b border-slate-200 text-center">Razão Social</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-600 uppercase border-r border-b border-slate-200 text-center">CNPJ</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-600 uppercase border-r border-b border-slate-200 text-center">Telefone</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-600 uppercase border-b border-slate-200 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {fornecedores.map((f) => (
                    <tr key={f._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 border-r border-b border-slate-200 text-center text-slate-800 font-medium">{f.nome}</td>
                      <td className="px-6 py-4 border-r border-b border-slate-200 text-center font-mono text-sm text-slate-600">{f.cnpj}</td>
                      <td className="px-6 py-4 border-r border-b border-slate-200 text-center text-sm text-slate-600">{f.telefones?.[0]?.numero || "---"}</td>
                      <td className="px-6 py-4 border-b border-slate-200 text-center">
                        <div className="flex justify-center gap-4">
                          <button onClick={() => navigate(`/fornecedor/editar/${f._id}`)} className="text-indigo-600 hover:scale-110 transition-transform"> Editar </button>
                          <button onClick={() => excluirFornecedor(f._id)} className="text-red-500 hover:scale-110 transition-transform"> Excluir </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* MENSAGEM CASO VAZIO (Só aparece se não houver entradas) */
          <div className="w-full text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="text-5xl mb-4 text-slate-300">🚚</div>
            <p className="text-slate-500 font-bold text-lg">Nenhum parceiro cadastrado</p>
            <p className="text-slate-400 text-sm">Clique em "Novo Parceiro" para começar.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaFornecedores;