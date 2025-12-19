import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UnidadeDAO from '../../objetos/dao/UnidadeDAO';

const UnidadeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dao = new UnidadeDAO();
  const [unidade, setUnidade] = useState({ nome: '', sigla: '' });

  useEffect(() => {
    if (id) {
      dao.listar().then(lista => {
        const alvo = lista.find(u => u._id === id);
        if (alvo) setUnidade(alvo);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dao.gravar(unidade);
    if (res) navigate('/unidades');
  };

  return (
    <div className="max-w-md mx-auto animate-fadeIn">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">
          {id ? '📝 Editar Unidade' : '📏 Nova Unidade'}
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-bold text-slate-700">Nome da Unidade</label>
            <input 
              value={unidade.nome} 
              onChange={e => setUnidade({...unidade, nome: e.target.value})}
              className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ex: Quilograma"
              required
            />
          </div>
          <div>
            <label className="text-sm font-bold text-slate-700">Sigla</label>
            <input 
              value={unidade.sigla} 
              onChange={e => setUnidade({...unidade, sigla: e.target.value})}
              className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ex: KG"
              maxLength="3"
              required
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={() => navigate('/unidades')} className="flex-1 bg-slate-100 py-2 rounded-lg font-bold">Voltar</button>
          <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700">Salvar</button>
        </div>
      </form>
    </div>
  );
};

export default UnidadeForm;