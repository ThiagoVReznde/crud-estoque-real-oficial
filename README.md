📦 EstoqueMaster - Sistema de Gestão de Estoque

O EstoqueMaster é uma plataforma Full Stack desenvolvida para o gerenciamento simplificado e profissional de inventários. O sistema permite o controle total de produtos, fornecedores e unidades de medida, apresentando uma interface moderna, responsiva e integrada com o MongoDB via Vercel.
🚀 Funcionalidades Principais
1. Gestão de Produtos

    Listagem em cards dinâmicos com status visual.

    Cadastro completo com suporte a Lógica Inteligente: crie uma nova unidade ou fornecedor sem sair do formulário de produto.

    Edição e exclusão integradas.

2. Gestão de Fornecedores

    Tabela administrativa organizada e centralizada.

    Validação de CNPJ: Algoritmo oficial de verificação de dígitos para evitar dados inconsistentes.

    Controle de múltiplos telefones de contato.

3. Unidades de Medida

    Padronização de métricas (KG, UN, LT, MT, etc.).

    Interface simplificada para rápida manutenção das siglas do estoque.

🛠️ Tecnologias Utilizadas

Frontend:

    React.js (Vite)

    Tailwind CSS (Estilização)

    React Router Dom (Navegação SPA)

Backend (Serverless):

    Node.js & Express

    Mongoose (Modelagem de Dados)

    Vercel Functions (Hospedagem API)

Banco de Dados:

    MongoDB Atlas (NoSQL Cloud)

📂 Estrutura do Projeto

├── api/                # Backend (Vercel Functions)
│   ├── dao/            # Data Access Objects (Lógica de Banco)
│   ├── models/         # Schemas do Mongoose
│   ├── routes/         # Rotas da API Express
│   └── index.js        # Ponto de entrada do servidor
├── src/                # Frontend (React)
│   ├── components/     # Componentes de UI (Listas e Forms)
│   ├── layout/         # Layout padrão (Navbar/Footer)
│   ├── objetos/dao/    # Classes de comunicação com a API
│   ├── routes/         # Configuração de rotas do React Router
│   └── App.jsx         # Componente raiz
├── public/             # Arquivos estáticos
└── vercel.json         # Configuração de Rewrites e Deploy