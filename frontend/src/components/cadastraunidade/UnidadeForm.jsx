import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UnidadeDAO from '../../objetos/dao/UnidadeDAO';

const UnidadeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dao = new UnidadeDAO();
  
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const res = await dao.gravar(unidade);
    setLoading(false);
    if (res) navigate('/unidades');
  };

  // Classes CSS Reutilizáveis
  const inputClass = "w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50 hover:bg-white";
  const labelClass = "block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5";

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {id ? 'Editar Unidade' : 'Nova Unidade'}
            </h2>
            <p className="text-slate-500 text-sm">Defina padrões de medida para o estoque.</p>
          </div>
          <button 
            type="button" 
            onClick={() => navigate('/unidades')}
            className="text-slate-400 hover:text-slate-600 transition-colors text-sm font-medium"
          >
            ← Voltar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-700 flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              Configuração de Medida
            </h3>

            <div>
              <label className={labelClass}>Nome por Extenso: </label>
              <input 
                placeholder="Ex: Metros, Litros, Peças" 
                value={unidade.nome} 
                onChange={e => setUnidade({...unidade, nome: e.target.value})}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Sigla (Abreviação): </label>
              
                <input 
                  placeholder="Ex: MT" 
                  value={unidade.sigla} 
                  onChange={e => setUnidade({...unidade, sigla: e.target.value.toUpperCase()})}
                  className={`${inputClass} font-mono uppercase text-center w-32`}
                  maxLength="3"
                  required
                />
            </div>
          </div>

          <br/>

          <div className="pt-4 flex flex-col gap-3">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Salvando...
                </>
              ) : (
                'Salvar Unidade'
              )}
            </button>
            
            <button 
              type="button" 
              onClick={() => navigate('/unidades')} 
              className="w-full py-3 text-slate-400 text-sm font-semibold hover:text-slate-600 transition-colors"
            >
              Descartar alterações
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default UnidadeForm;