import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FornecedorDAO from '../../objetos/dao/FornecedorDAO';

const FornecedorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dao = new FornecedorDAO();
  
  const [loading, setLoading] = useState(false);
  const [fornecedor, setFornecedor] = useState({
    nome: '',
    cnpj: '',
    telefones: [{ numero: '' }]
  });

  useEffect(() => {
    if (id) {
      dao.listar().then(lista => {
        const alvo = lista.find(f => f._id === id);
        if (alvo) setFornecedor(alvo);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await dao.gravar(fornecedor);
    setLoading(false);
    if (res) navigate('/fornecedores');
  };

  // --- Classes CSS Reutilizáveis (Padrão Identidade Visual) ---
  const inputClass = "w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50 hover:bg-white";
  const labelClass = "block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5";

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {id ? 'Editar Fornecedor' : 'Novo Fornecedor'}
            </h2>
            <p className="text-slate-500 text-sm">Gerencie os dados de contato da empresa parceira.</p>
          </div>
          <button 
            type="button" 
            onClick={() => navigate('/fornecedores')}
            className="text-slate-400 hover:text-slate-600 transition-colors text-sm font-medium"
          >
            ← Voltar para lista
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          
          {/* Sessão: Informações Gerais */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-700 flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              Dados Cadastrais
            </h3>

            <div>
              <label className={labelClass}>Razão Social / Nome Fantasia: </label>
              <input 
                placeholder="Ex: Logística Brasil LTDA" 
                value={fornecedor.nome} 
                onChange={e => setFornecedor({...fornecedor, nome: e.target.value})}
                className={inputClass}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>CNPJ: </label>
                <input 
                  placeholder="00.000.000/0001-00" 
                  value={fornecedor.cnpj} 
                  onChange={e => setFornecedor({...fornecedor, cnpj: e.target.value})}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Telefone Principal: </label>
                <input 
                  placeholder="(00) 00000-0000" 
                  value={fornecedor.telefones[0]?.numero || ''} 
                  onChange={e => {
                    const tels = [...fornecedor.telefones];
                    tels[0] = { numero: e.target.value };
                    setFornecedor({...fornecedor, telefones: tels});
                  }}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Ações */}
          <div className="flex gap-4 pt-2">
            <button 
              type="button" 
              onClick={() => navigate('/fornecedores')} 
              className="flex-1 px-6 py-3.5 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200"
            >
              Cancelar
            </button>
            
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Salvando...
                </>
              ) : (
                'Salvar Fornecedor'
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-slate-400 text-xs mt-8 italic">
          Certifique-se de que os dados estão corretos antes de salvar.
        </p>
      </div>
    </div>
  );
};

export default FornecedorForm;