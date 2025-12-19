import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UnidadeDAO from '../../objetos/dao/UnidadeDAO';

const ListaUnidades = () => {
  const [unidades, setUnidades] = useState([]);
  const navigate = useNavigate();
  const dao = new UnidadeDAO();

  const carregar = async () => setUnidades(await dao.listar());

  useEffect(() => {
    carregar();
  }, []);

  return (
    // Centralizamos o container pai para que o header e a tabela andem juntos
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* HEADER DA PÁGINA */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">📏 Unidades</h2>
          <p className="text-slate-500 text-sm">Métricas de estoque</p>
        </div>
        <button 
          onClick={() => navigate('/unidade/novo')} 
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all active:scale-95"
        >
          + Novo
        </button>
      </div>

      {/* TABELA CENTRALIZADA (mx-auto) */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mx-auto w-full">
        <table className="w-full text-left border-collapse">
          {/* ... thead e tbody mantidos igual ao anterior */}
        </table>
      </div>
    </div>
  );
};
export default ListaUnidades;