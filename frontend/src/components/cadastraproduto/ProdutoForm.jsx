import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProdutoDAO from '../../objetos/dao/ProdutoDAO';
import UnidadeDAO from '../../objetos/dao/UnidadeDAO';
import FornecedorDAO from '../../objetos/dao/FornecedorDAO';

const ProdutoForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const produtoDAO = new ProdutoDAO();
  const unidadeDAO = new UnidadeDAO();
  const fornecedorDAO = new FornecedorDAO();

  const [listaUnidades, setListaUnidades] = useState([]);
  const [listaFornecedores, setListaFornecedores] = useState([]);
  const [modoUnidade, setModoUnidade] = useState('existente');
  const [modoFornecedor, setModoFornecedor] = useState('existente');
  const [loading, setLoading] = useState(false);

  const [produto, setProduto] = useState({
    nome: '',
    quantidade: 0,
    unidade: { _id: '', nome: '', sigla: '' },
    fornecedor: { _id: '', nome: '', cnpj: '', telefones: [{ numero: '' }] },
  });

  useEffect(() => {
    const carregarDados = async () => {
      setListaUnidades(await unidadeDAO.listar());
      setListaFornecedores(await fornecedorDAO.listar());

      if (id) {
        const todos = await produtoDAO.listar();
        const alvo = todos.find((p) => p._id === id);
        if (alvo) {
          setProduto({
            ...alvo,
            unidade: alvo.unidade || { _id: '' },
            fornecedor: alvo.fornecedor || { _id: '' },
          });
        }
      }
    };
    carregarDados();
  }, [id]);

  const handleInput = (e, entidade, campo) => {
    const { name, value } = e.target;
    if (!entidade) {
      setProduto({ ...produto, [name]: value });
    } else if (entidade === 'telefones') {
      const novosTels = [...produto.fornecedor.telefones];
      if (!novosTels[0]) novosTels[0] = { numero: '' };
      novosTels[0].numero = value;
      setProduto({
        ...produto,
        fornecedor: { ...produto.fornecedor, telefones: novosTels },
      });
    } else {
      setProduto({
        ...produto,
        [entidade]: { ...produto[entidade], [campo]: value },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      _id: id || null, 
      nome: produto.nome,
      quantidade: Number(produto.quantidade),
      unidade: modoUnidade === 'existente' ? produto.unidade._id : { nome: produto.unidade.nome, sigla: produto.unidade.sigla },
      fornecedor: modoFornecedor === 'existente' ? produto.fornecedor._id : { nome: produto.fornecedor.nome, cnpj: produto.fornecedor.cnpj, telefones: produto.fornecedor.telefones }
    };
  
    const res = await produtoDAO.gravar(payload);
    setLoading(false);
    if (res) navigate('/');
  };

  // Classes CSS Reutilizáveis
  const inputClass = "w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50 hover:bg-white";
  const labelClass = "block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5";
  const cardSection = "bg-white p-6 rounded-xl border border-slate-200 shadow-sm";

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                {id ? 'Editar Produto' : 'Novo Produto'}
              </h2>
              <p className="text-slate-500 text-sm">Preencha as informações detalhadas do estoque.</p>
            </div>
            <button 
              type="button" 
              onClick={() => navigate('/')}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              Voltar para lista
            </button>
          </div>

          {/* DADOS PRINCIPAIS */}
          <section className={cardSection}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className={labelClass}>Nome do Produto</label>
                <input name="nome" placeholder="Ex: Cadeira Ergonômica" value={produto.nome} onChange={handleInput} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Quantidade</label>
                <input name="quantidade" type="number" value={produto.quantidade} onChange={handleInput} className={inputClass} required />
              </div>
            </div>
          </section>

          {/* UNIDADE DE MEDIDA */}
          <section className={cardSection}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                Unidade de Medida
              </h3>
              
              <div className="inline-flex p-1 bg-slate-100 rounded-lg">
                <button 
                  type="button" 
                  onClick={() => setModoUnidade('existente')} 
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${modoUnidade === 'existente' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  LISTA
                </button>
                <button 
                  type="button" 
                  onClick={() => setModoUnidade('novo')} 
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${modoUnidade === 'novo' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  CRIAR
                </button>
              </div>
            </div>

            {modoUnidade === 'existente' ? (
              <select value={produto.unidade._id || ''} onChange={(e) => handleInput(e, 'unidade', '_id')} className={inputClass} required>
                <option value="">Selecione uma unidade...</option>
                {listaUnidades.map((u) => <option key={u._id} value={u._id}>{u.nome} ({u.sigla})</option>)}
              </select>
            ) : (
              <div className="grid grid-cols-3 gap-4 animate-in fade-in duration-300">
                <div className="col-span-2">
                  <input placeholder="Nome (Ex: Kilogramas)" value={produto.unidade.nome} onChange={(e) => handleInput(e, 'unidade', 'nome')} className={inputClass} />
                </div>
                <div className="col-span-1">
                  <input placeholder="Sigla (KG)" value={produto.unidade.sigla} onChange={(e) => handleInput(e, 'unidade', 'sigla')} className={inputClass} maxLength="3" />
                </div>
              </div>
            )}
          </section>

          {/* FORNECEDOR */}
          <section className={cardSection}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                Fornecedor
              </h3>
              
              <div className="inline-flex p-1 bg-slate-100 rounded-lg">
                <button 
                  type="button" 
                  onClick={() => setModoFornecedor('existente')} 
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${modoFornecedor === 'existente' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  LISTA
                </button>
                <button 
                  type="button" 
                  onClick={() => setModoFornecedor('novo')} 
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${modoFornecedor === 'novo' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  CRIAR
                </button>
              </div>
            </div>

            {modoFornecedor === 'existente' ? (
              <select value={produto.fornecedor._id || ''} onChange={(e) => handleInput(e, 'fornecedor', '_id')} className={inputClass} required>
                <option value="">Selecione o fornecedor...</option>
                {listaFornecedores.map((f) => <option key={f._id} value={f._id}>{f.nome} - {f.cnpj}</option>)}
              </select>
            ) : (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div>
                  <label className={labelClass}>Razão Social</label>
                  <input placeholder="Ex: Alimentos S.A." value={produto.fornecedor.nome} onChange={(e) => handleInput(e, 'fornecedor', 'nome')} className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>CNPJ</label>
                    <input placeholder="00.000.000/0001-00" value={produto.fornecedor.cnpj} onChange={(e) => handleInput(e, 'fornecedor', 'cnpj')} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Telefone Comercial</label>
                    <input placeholder="(00) 0000-0000" value={produto.fornecedor.telefones[0]?.numero || ''} onChange={(e) => handleInput(e, 'telefones')} className={inputClass} />
                  </div>
                </div>
              </div>
            )}
          </section>
          
          <br/>
          
          <div className="flex pt-4 gap-4">
            <button 
              type="submit" 
              disabled={loading} 
              className="flex-1 bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Salvando...
                </>
              ) : (
                'Confirmar Registro'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProdutoForm;