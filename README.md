# To-Do List | Desenvolvimento de Software em Nuvem

Sistema de gerenciamento de tarefas desenvolvido com React e Convex, utilizando autenticação de usuários, banco de dados em tempo real e funções serverless.

## Objetivo

Desenvolver uma aplicação baseada em BaaS (Backend as a Service), aplicando conceitos de:

- CRUD
- Banco de dados
- Funções Serverless
- Comunicação em tempo real
- Autenticação e controle de acesso

## Tecnologias Utilizadas

### Frontend
- React
- Vite
- JavaScript

### Backend
- Convex

### Controle de Versão
- Git
- GitHub

## Funcionalidades

### Autenticação
- Cadastro de usuários
- Login
- Logout
- Persistência de sessão

### Gerenciamento de Tarefas
- Criar tarefas
- Listar tarefas
- Atualizar tarefas
- Excluir tarefas
- Marcar tarefas como concluídas
- Reabrir tarefas concluídas

### Resumo das Tarefas
- Total de tarefas
- Quantidade de tarefas concluídas
- Quantidade de tarefas pendentes

### Comunicação em Tempo Real
- Atualização automática entre abas abertas
- Sincronização instantânea sem necessidade de atualizar a página

### Controle de Acesso
- Cada usuário acessa apenas suas próprias tarefas
- Dados protegidos por autenticação

## Como Executar

### 1. Clonar o repositório

```bash
git clone https://github.com/anavzurc/todo-codex.git
```

### 2. Instalar dependências

```bash
npm install
```

```bash
cd frontend
npm install
```

### 3. Executar Convex

Na raiz do projeto:

```bash
npx convex dev
```

### 4. Executar Frontend

Dentro da pasta frontend:

```bash
npm run dev
```

## Evidências dos Requisitos

### CRUD
- Criação de tarefas
- Leitura das tarefas
- Atualização de status
- Exclusão de tarefas

### Função Serverless
- `getSummary`
- Calcula total, concluídas e pendentes

### Comunicação em Tempo Real
- Atualização automática entre múltiplas abas

### Autenticação e Controle de Acesso
- Cadastro
- Login
- Logout
- Sessão persistente
- Acesso isolado por usuário
