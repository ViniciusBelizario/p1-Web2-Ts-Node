
# GameRanker

## Descrição

O **GameRanker** é uma aplicação web que permite aos usuários explorar, avaliar e se informar sobre os jogos mais populares. Ele também possui um sistema de login onde os usuários podem se registrar, autenticar e gerenciar suas contas.

## Funcionalidades

- **Login/Logout**: Permite que os usuários façam login e logout.
- **Explorar jogos**: Lista os jogos populares em um ranking com avaliações.
- **Avaliação de jogos**: Permite aos usuários avaliar os jogos.
- **Sistema de autenticação**: Autenticação simples com armazenamento em `localStorage`.

## Tecnologias utilizadas

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Gerenciamento de Estado**: `localStorage`
- **Ferramentas de Build**: Vite
- **Estilo e UI**: Tailwind CSS

## Requisitos

Antes de começar, você precisará ter instalado as seguintes ferramentas em sua máquina:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## Instalação

Siga os passos abaixo para configurar e rodar o projeto localmente.

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/GameRanker.git
cd GameRanker
```

### 2. Instale as dependências

Se você estiver usando npm, rode:

```bash
npm install
```

Ou se estiver usando yarn:

```bash
yarn install
```

### 3. Configuração de ambiente

Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente conforme necessário. Um exemplo básico pode ser:

```bash
# .env
PORT=5000
```

### 4. Executando o Backend

O projeto usa um servidor backend simples com Node.js e Express para autenticação. Para rodar o backend:

```bash
npm run dev
```

O servidor será executado na porta `5000` por padrão.

### 5. Executando o Frontend

Para rodar o frontend, execute o seguinte comando:

```bash
npm run dev
```

Ou com yarn:

```bash
yarn dev
```

O frontend será executado em `http://localhost:5173` por padrão.

## Estrutura do projeto

```bash
├── src/
│   ├── assets/            # Imagens e ícones
│   ├── components/        # Componentes React
│   ├── utils/             # Funções utilitárias
│   ├── App.tsx            # Componente principal da aplicação
│   ├── main.tsx           # Arquivo de entrada
│   └── index.css          # Estilos globais
├── package.json           # Dependências e scripts do npm
├── README.md              # Instruções e informações do projeto
├── tsconfig.json          # Configurações do TypeScript
└── .gitignore             # Arquivos e diretórios ignorados pelo Git
```

## Endpoints da API

### `GET /api/user`

Esse endpoint retorna as informações do usuário pré-cadastrado no sistema. O backend é simples, mas simula um sistema de autenticação para fins de teste.

### Exemplo de resposta:

```json
{
  "email": "admin@admin.com",
  "password": "admin123"
}
```

## Uso da aplicação

### Login

1. Ao abrir a aplicação, o usuário pode clicar em **Entrar** no canto superior direito.
2. O usuário deve inserir as credenciais `admin@admin.com` como e-mail e `admin123` como senha para realizar o login.
3. Após o login, o nome do usuário será exibido no lugar do botão de **Entrar**.

### Avaliar jogos

1. Na página principal, os usuários podem visualizar os jogos mais populares.
2. Cada jogo possui uma opção para avaliar, onde o usuário pode atribuir uma nota.

## Scripts disponíveis

### `npm run dev`

Inicia o frontend e o backend em modo de desenvolvimento.

### `npm run build`

Compila o frontend para produção.

### `npm run start`

Inicia o backend.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests no repositório.

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).
