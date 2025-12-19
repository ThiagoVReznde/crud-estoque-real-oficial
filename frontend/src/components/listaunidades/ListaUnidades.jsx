import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UnidadeDAO from '../../objetos/dao/UnidadeDAO';

const ListaUnidades = () => {
  const [unidades, setUnidades] = useState([]);
  const navigate = useNavigate();
  const dao = new UnidadeDAO();

  const carregar = async () => setUnidades(await dao.listar());
  useEffect(() => { carregar(); }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Unidades de Medida</h2>
        <button onClick={() => navigate('/unidade/novo')} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">
          + Nova Unidade
        </button>
      </div>

      <div className="max-w-2xl overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 font-bold">Descrição</th>
              <th className="p-4 font-bold">Sigla</th>
              <th className="p-4 font-bold text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {unidades.map(u => (
              <tr key={u._id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium">{u.nome}</td>
                <td className="p-4"><span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-bold uppercase">{u.sigla}</span></td>
                <td className="p-4 text-center space-x-4">
                  <button onClick={() => navigate(`/unidade/editar/${u._id}`)} className="text-blue-600 font-bold hover:underline">Editar</button>
                  <button onClick={async () => { if(window.confirm('Excluir?')) { await dao.excluir(u._id); carregar(); } }} className="text-red-600 font-bold hover:underline">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaUnidades;