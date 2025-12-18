import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProdutoDAO from '../../objetos/dao/ProdutoDAO';
import UnidadeDAO from '../../objetos/dao/UnidadeDAO'; // Importando DAO
import FornecedorDAO from '../../objetos/dao/FornecedorDAO'; // Importando DAO

const ProdutoForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Instância dos DAOs
  const produtoDAO = new ProdutoDAO();
  const unidadeDAO = new UnidadeDAO();
  const fornecedorDAO = new FornecedorDAO();

  // Estados das listas para os Selects
  const [listaUnidades, setListaUnidades] = useState([]);
  const [listaFornecedores, setListaFornecedores] = useState([]);

  // Estados de Modo: 'existente' (Select) ou 'novo' (Inputs)
  const [modoUnidade, setModoUnidade] = useState('existente');
  const [modoFornecedor, setModoFornecedor] = useState('existente');

  // Estado do Produto
  const [produto, setProduto] = useState({
    nome: '',
    quantidade: 0,
    unidade: { _id: '', nome: '', sigla: '' },
    fornecedor: { _id: '', nome: '', cnpj: '', telefones: [{ numero: '' }] },
  });

  // 1. Carregar dados iniciais (Listas + Produto se for edição)
  useEffect(() => {
    const carregarDados = async () => {
      // Carrega listas para os dropdowns
      setListaUnidades(await unidadeDAO.listar());
      setListaFornecedores(await fornecedorDAO.listar());

      // Se for edição, carrega o produto
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

  // 2. Manipulador de Inputs Inteligente
  const handleInput = (e, entidade, campo, indexTel = null) => {
    const { name, value } = e.target;

    if (!entidade) {
      // Campos diretos (nome, quantidade)
      setProduto({ ...produto, [name]: value });
    } else if (entidade === 'telefones') {
      // Telefone do fornecedor (array)
      const novosTels = [...produto.fornecedor.telefones];
      if (!novosTels[0]) novosTels[0] = { numero: '' }; // Garante que existe objeto
      novosTels[0].numero = value;
      setProduto({
        ...produto,
        fornecedor: { ...produto.fornecedor, telefones: novosTels },
      });
    } else {
      // Unidade ou Fornecedor (Objetos aninhados)
      setProduto({
        ...produto,
        [entidade]: { ...produto[entidade], [campo]: value },
      });
    }
  };

  // 3. Enviar Formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nome: produto.nome,
      quantidade: produto.quantidade,
      unidade: null,
      fornecedor: null,
    };

    // Lógica Unidade: Se for existente manda ID, se novo manda Objeto
    if (modoUnidade === 'existente') payload.unidade = produto.unidade._id;
    else {
      const { _id, ...resto } = produto.unidade; // Remove _id vazio
      payload.unidade = resto;
    }

    // Lógica Fornecedor
    if (modoFornecedor === 'existente')
      payload.fornecedor = produto.fornecedor._id;
    else {
      const { _id, ...resto } = produto.fornecedor;
      payload.fornecedor = resto;
    }

    const res = await produtoDAO.gravar(payload);
    if (res) navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>{id ? 'Editar Produto' : 'Cadastro de Produto'}</h2>

      {/* --- DADOS BÁSICOS --- */}
      <div className="form-group">
        <label>Nome do Produto:</label>
        <input
          name="nome"
          value={produto.nome}
          onChange={(e) => handleInput(e)}
          placeholder="Ex: Cadeira"
          required
        />
      </div>

      <div className="form-group">
        <label>Quantidade:</label>
        <input
          name="quantidade"
          type="number"
          value={produto.quantidade}
          onChange={(e) => handleInput(e)}
          placeholder="0"
          required
        />
      </div>

      <hr />

      {/* --- BLOCO UNIDADE --- */}
      <fieldset className="relation-box">
        <legend>Unidade de Medida</legend>

        {/* Botões de Troca */}
        <div className="toggle-mode">
          <label>
            <input
              type="radio"
              name="modoUnidade"
              checked={modoUnidade === 'existente'}
              onChange={() => setModoUnidade('existente')}
            />{' '}
            Selecionar da Lista
          </label>
          <label>
            <input
              type="radio"
              name="modoUnidade"
              checked={modoUnidade === 'novo'}
              onChange={() => setModoUnidade('novo')}
            />{' '}
            Criar Nova
          </label>
        </div>

        {modoUnidade === 'existente' ? (
          <select
            value={produto.unidade._id || ''}
            onChange={(e) => handleInput(e, 'unidade', '_id')}
            className="full-width"
          >
            <option value="">-- Selecione --</option>
            {listaUnidades.map((u) => (
              <option key={u._id} value={u._id}>
                {u.nome} ({u.sigla})
              </option>
            ))}
          </select>
        ) : (
          <div className="nested-form">
            <input
              placeholder="Nome (Ex: Metro)"
              value={produto.unidade.nome}
              onChange={(e) => handleInput(e, 'unidade', 'nome')}
            />
            <input
              placeholder="Sigla (Ex: MT)"
              value={produto.unidade.sigla}
              onChange={(e) => handleInput(e, 'unidade', 'sigla')}
              maxLength="3"
            />
          </div>
        )}
      </fieldset>

      {/* --- BLOCO FORNECEDOR --- */}
      <fieldset className="relation-box">
        <legend>Fornecedor</legend>

        <div className="toggle-mode">
          <label>
            <input
              type="radio"
              name="modoFornecedor"
              checked={modoFornecedor === 'existente'}
              onChange={() => setModoFornecedor('existente')}
            />{' '}
            Selecionar da Lista
          </label>
          <label>
            <input
              type="radio"
              name="modoFornecedor"
              checked={modoFornecedor === 'novo'}
              onChange={() => setModoFornecedor('novo')}
            />{' '}
            Cadastrar Novo
          </label>
        </div>

        {modoFornecedor === 'existente' ? (
          <select
            value={produto.fornecedor._id || ''}
            onChange={(e) => handleInput(e, 'fornecedor', '_id')}
            className="full-width"
          >
            <option value="">-- Selecione --</option>
            {listaFornecedores.map((f) => (
              <option key={f._id} value={f._id}>
                {f.nome} - {f.cnpj}
              </option>
            ))}
          </select>
        ) : (
          <div className="nested-form-col">
            <input
              placeholder="Nome da Empresa"
              value={produto.fornecedor.nome}
              onChange={(e) => handleInput(e, 'fornecedor', 'nome')}
            />
            <input
              placeholder="CNPJ"
              value={produto.fornecedor.cnpj}
              onChange={(e) => handleInput(e, 'fornecedor', 'cnpj')}
            />
            <input
              placeholder="Telefone"
              value={produto.fornecedor.telefones[0]?.numero || ''}
              onChange={(e) => handleInput(e, 'telefones')}
            />
          </div>
        )}
      </fieldset>

      <button
        type="submit"
        className="btn-primary"
        style={{ marginTop: '15px' }}
      >
        Salvar Produto
      </button>
    </form>
  );
};

export default ProdutoForm;
