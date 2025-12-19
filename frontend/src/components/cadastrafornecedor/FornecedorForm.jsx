import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FornecedorDAO from '../../objetos/dao/FornecedorDAO';

const FornecedorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dao = new FornecedorDAO();
  
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
    const res = await dao.gravar(fornecedor);
    if (res) navigate('/fornecedores');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">
          {id ? '🏢 Editar Fornecedor' : '🚚 Novo Fornecedor'}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <input 
            placeholder="Razão Social" 
            value={fornecedor.nome} 
            onChange={e => setFornecedor({...fornecedor, nome: e.target.value})}
            className="w-full border p-2.5 rounded-lg"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input 
              placeholder="CNPJ" 
              value={fornecedor.cnpj} 
              onChange={e => setFornecedor({...fornecedor, cnpj: e.target.value})}
              className="w-full border p-2.5 rounded-lg"
              required
            />
            <input 
              placeholder="Telefone principal" 
              value={fornecedor.telefones[0]?.numero || ''} 
              onChange={e => {
                const tels = [...fornecedor.telefones];
                tels[0] = { numero: e.target.value };
                setFornecedor({...fornecedor, telefones: tels});
              }}
              className="w-full border p-2.5 rounded-lg"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={() => navigate('/fornecedores')} className="flex-1 bg-slate-100 py-3 rounded-xl font-bold">Cancelar</button>
          <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700">Confirmar</button>
        </div>
      </form>
    </div>
  );
};

export default FornecedorForm;