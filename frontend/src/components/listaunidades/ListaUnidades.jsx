import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UnidadeDAO from '../../objetos/dao/UnidadeDAO';

const ListaUnidades = () => {
  const [unidades, setUnidades] = useState([]);
  const navigate = useNavigate();
  const dao = new UnidadeDAO();

  const carregarUnidades = async () => {
    const dados = await dao.listar();
    setUnidades(dados);
  };

  useEffect(() => {
    carregarUnidades();
  }, []);

  const excluirUnidade = async (id) => {
    if (window.confirm('Deseja realmente excluir esta unidade?')) {
      await dao.excluir(id);
      carregarUnidades();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* CABEÇALHO PADRONIZADO */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">📏 Unidades</h2>
          <p className="text-slate-500 text-sm font-medium">Métricas e escalas de medida</p>
        </div>

        <button 
          onClick={() => navigate('/unidade/novo')} 
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center gap-2 active:scale-95"
        >
          <span className="text-xl">+</span> Nova Unidade
        </button>
      </div>

      {/* TABELA ORGANIZADA E CENTRALIZADA */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 font-bold text-slate-700 text-sm uppercase tracking-wider">Descrição</th>
              <th className="p-4 font-bold text-slate-700 text-sm uppercase tracking-wider">Sigla</th>
              <th className="p-4 font-bold text-slate-700 text-sm uppercase tracking-wider text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {unidades.map((u) => (
              <tr key={u._id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 text-slate-800 font-medium">{u.nome}</td>
                <td className="p-4">
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-xs font-black border border-slate-200">
                    {u.sigla}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-4">
                    <button 
                      onClick={() => navigate(`/unidade/editar/${u._id}`)}
                      className="text-blue-600 hover:text-blue-800 font-bold text-sm transition-colors"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => excluirUnidade(u._id)}
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

      {/* MENSAGEM CASO VAZIO */}
      {unidades.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-medium">Nenhuma unidade cadastrada.</p>
        </div>
      )}
    </div>
  );
};

export default ListaUnidades;