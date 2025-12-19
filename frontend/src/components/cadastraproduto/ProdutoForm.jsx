import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProdutoDAO from '../../objetos/dao/ProdutoDAO';
import UnidadeDAO from '../../objetos/dao/UnidadeDAO';
import FornecedorDAO from '../../objetos/dao/FornecedorDAO';

const ProdutoForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Captura o ID da URL para saber se é edição

  // Instâncias dos DAOs para comunicação com o backend
  const produtoDAO = new ProdutoDAO();
  const unidadeDAO = new UnidadeDAO();
  const fornecedorDAO = new FornecedorDAO();

  // Estados de controle
  const [listaUnidades, setListaUnidades] = useState([]);
  const [listaFornecedores, setListaFornecedores] = useState([]);
  const [modoUnidade, setModoUnidade] = useState('existente');
  const [modoFornecedor, setModoFornecedor] = useState('existente');
  const [loading, setLoading] = useState(false);

  // Estado principal do Produto
  const [produto, setProduto] = useState({
    nome: '',
    quantidade: 0,
    unidade: { _id: '', nome: '', sigla: '' },
    fornecedor: { _id: '', nome: '', cnpj: '', telefones: [{ numero: '' }] },
  });

  // Carregamento de dados iniciais
  useEffect(() => {
    const carregarDados = async () => {
      // Carrega listas para os dropdowns
      setListaUnidades(await unidadeDAO.listar());
      setListaFornecedores(await fornecedorDAO.listar());

      // Se houver ID, busca o produto específico para edição
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

  // Manipulador de inputs para campos aninhados
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

  // Envio do formulário para o backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      nome: produto.nome,
      quantidade: Number(produto.quantidade),
      // Envia apenas o ID se existir, ou o objeto completo para criar novo
      unidade: modoUnidade === 'existente' ? produto.unidade._id : { nome: produto.unidade.nome, sigla: produto.unidade.sigla },
      fornecedor: modoFornecedor === 'existente' ? produto.fornecedor._id : { nome: produto.fornecedor.nome, cnpj: produto.fornecedor.cnpj, telefones: produto.fornecedor.telefones }
    };

    // Chama o método gravar (POST ou PUT dependendo da lógica do seu DAO)
    const res = await produtoDAO.gravar(payload);
    setLoading(false);
    if (res) navigate('/'); // Redireciona para a listagem após sucesso
  };

  // Estilo padrão para os inputs
  const inputClass = "w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white shadow-sm";

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        <header className="border-b border-slate-200 pb-4">
          <h2 className="text-3xl font-extrabold text-slate-800">
            {id ? '📝 Editar Item' : '📦 Novo Produto'}
          </h2>
        </header>

        {/* DADOS PRINCIPAIS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">Nome do Produto</label>
            <input name="nome" value={produto.nome} onChange={handleInput} className={inputClass} required />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">Quantidade</label>
            <input name="quantidade" type="number" value={produto.quantidade} onChange={handleInput} className={inputClass} required />
          </div>
        </section>

        {/* UNIDADE DE MEDIDA */}
        <fieldset className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex justify-between items-center">
            <legend className="text-lg font-bold text-blue-800 italic">Unidade de Medida</legend>
            <div className="flex bg-slate-200 p-1 rounded-lg text-xs font-bold uppercase">
              <button type="button" onClick={() => setModoUnidade('existente')} className={`px-3 py-1 rounded ${modoUnidade === 'existente' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Selecionar</button>
              <button type="button" onClick={() => setModoUnidade('novo')} className={`px-3 py-1 rounded ${modoUnidade === 'novo' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Criar</button>
            </div>
          </div>

          {modoUnidade === 'existente' ? (
            <select value={produto.unidade._id || ''} onChange={(e) => handleInput(e, 'unidade', '_id')} className={inputClass} required>
              <option value="">-- Selecione --</option>
              {listaUnidades.map((u) => <option key={u._id} value={u._id}>{u.nome} ({u.sigla})</option>)}
            </select>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Ex: Gramas" value={produto.unidade.nome} onChange={(e) => handleInput(e, 'unidade', 'nome')} className={inputClass} />
              <input placeholder="Ex: GR" value={produto.unidade.sigla} onChange={(e) => handleInput(e, 'unidade', 'sigla')} className={inputClass} maxLength="3" />
            </div>
          )}
        </fieldset>

        {/* FORNECEDOR */}
        <fieldset className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex justify-between items-center">
            <legend className="text-lg font-bold text-blue-800 italic">Fornecedor</legend>
            <div className="flex bg-slate-200 p-1 rounded-lg text-xs font-bold uppercase">
              <button type="button" onClick={() => setModoFornecedor('existente')} className={`px-3 py-1 rounded ${modoFornecedor === 'existente' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Lista</button>
              <button type="button" onClick={() => setModoFornecedor('novo')} className={`px-3 py-1 rounded ${modoFornecedor === 'novo' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Novo</button>
            </div>
          </div>

          {modoFornecedor === 'existente' ? (
            <select value={produto.fornecedor._id || ''} onChange={(e) => handleInput(e, 'fornecedor', '_id')} className={inputClass} required>
              <option value="">-- Selecione --</option>
              {listaFornecedores.map((f) => <option key={f._id} value={f._id}>{f.nome} - {f.cnpj}</option>)}
            </select>
          ) : (
            <div className="space-y-4">
              <input placeholder="Razão Social" value={produto.fornecedor.nome} onChange={(e) => handleInput(e, 'fornecedor', 'nome')} className={inputClass} />
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="CNPJ" value={produto.fornecedor.cnpj} onChange={(e) => handleInput(e, 'fornecedor', 'cnpj')} className={inputClass} />
                <input placeholder="Telefone" value={produto.fornecedor.telefones[0]?.numero || ''} onChange={(e) => handleInput(e, 'telefones')} className={inputClass} />
              </div>
            </div>
          )}
        </fieldset>

        <div className="flex gap-4">
          <button type="button" onClick={() => navigate('/')} className="flex-1 bg-slate-200 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-300 transition-all">Cancelar</button>
          <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 shadow-lg disabled:opacity-50 transition-all">
            {loading ? 'Salvando...' : 'Salvar Registro'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProdutoForm;