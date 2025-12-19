import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UnidadeDAO from '../../objetos/dao/UnidadeDAO';

const ListaUnidades = () => {
  const [unidades, setUnidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dao = new UnidadeDAO();

  const carregarUnidades = async () => {
    setLoading(true);
    const dados = await dao.listar();
    setUnidades(dados);
    setLoading(false);
  };

  useEffect(() => {
    carregarUnidades();
  }, []);

  const excluirUnidade = async (id) => {
    if (window.confirm('Excluir esta unidade pode afetar o cálculo de estoque dos produtos vinculados. Confirmar?')) {
      await dao.excluir(id);
      carregarUnidades();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        
        {/* CABEÇALHO */}
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Unidades</h2>
            <p className="text-slate-500 font-medium">Configurações de medida</p>
          </div>
          <button 
            onClick={() => navigate('/unidade/novo')} 
            className="bg-indigo-600 text-white px-6 py-3.5 rounded-xl font-bold shadow-lg"
          >
            + Nova Unidade
          </button>
        </div>

        {/* TABELA CONDICIONAL */}
        {unidades.length > 0 ? (
          <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="px-6 py-4 text-xs font-black text-slate-600 uppercase border-r border-b border-slate-200 text-center">Descrição</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-600 uppercase border-r border-b border-slate-200 text-center">Sigla</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-600 uppercase border-b border-slate-200 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {unidades.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 border-r border-b border-slate-200 text-center text-slate-800 font-bold">{u.nome}</td>
                    <td className="px-6 py-4 border-r border-b border-slate-200 text-center">
                      <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded border border-indigo-100 font-mono font-bold">
                        {u.sigla}
                      </span>
                    </td>
                    <td className="px-6 py-4 border-b border-slate-200 text-center">
                      <div className="flex justify-center gap-4">
                        <button onClick={() => navigate(`/unidade/editar/${u._id}`)} className="text-indigo-600"> Editar </button>
                        <button onClick={() => excluirUnidade(u._id)} className="text-red-500"> Excluir </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold">Nenhuma unidade de medida encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaUnidades;