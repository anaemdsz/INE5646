

## Requisitos da aplicação web (Moodle)
- A aplicação deve ser acessível apenas após autenticação
- A aplicação deve permitir o cadastro de novos usuários <span style="color: red"> [001] </span>
- Quando autenticado, o usuário deve poder atualizar seu cadastro <span style="color: red"> [002] </span>
- Deve existir alguma base de dados no back-end
- Deve ser possível compartilhar dados entre usuários <span style="color: green"> [003] </span>
- A aplicação deve ficar disponível 24/7 em algum servidor da Nuvem UFSC ou externo à UFSC (vamos ver como configurar isso ainda)
- O front-end deve ser responsivo (desktop e mobile)


<br><br>

---

## Tecnologias

- Tecnologias
    - Node.js
    - React.js (frontend)
    - MongoDB (database)
- Deploy
    - Servidor da UFSC (nuvem)

<br><br>

---

## Descrição da aplicação

Uma aplicação de quadros Kanban, com as seguintes funcionalidades:
1. Usuários
    - Cadastrar usuário <span style="color: red"> [001] </span>
    - Efetuar login/autenticação
    - Editar informações do usuário <span style="color: red"> [002] </span>
2. Kanban (quadros)
    - Criar um quadro
    - Excluir um quadro
    - Listar quadros disponíveis
    - Visualizar um quadro
    - Compartilhar um quadro
        - Adicionar usuário ao quadro como "participante" <span style="color: green"> [003] </span>
        - Participantes podem mover/excluir tarefas
    - Sugestão: utilizar colunas fixas (TODO, Doing, Done).
3. Kanban (tarefas)
    - Criar tarefas (tasks, cards) associadas a um quadro
    - Mover/excluir tarefas

<br><br>

---

## Telas a serem implementadas

1. Cadastrar usuário
    - Leva para a tela de login
2. Efetuar login
    - Leva para a tela de listagem de quadros
3. Editar usuário
    - Leva para a tela de listagem de quadros
4. Listar quadros criados
    - Botão para criar novo quadro (vazio)
    - Clicar sobre um quadro leva para a visualização daquele quadro
5. Visualizar um quadro (com colunas e respectivas tarefas)
    - Criar tarefas
    - Mover tarefas de uma coluna para outra
    - Excluir tarefas
    - Adicionar usuário como participante
        - Sugestão: Busca usuário pelo username, por exemplo

<br><br>

---


## Exemplos de tabelas

Exemplos de tabelas (que na verdade são objetos JSON) a serem armazenados no MongoDB.

#### Usuário (Users)
```json
{
    "_id" : "String", *UNIQUE           // Id gerenciado pelo MongoDB
    "name" : "String",
    "email" : "String",
    "username" : "String" *UNIQUE,      // Identificador único
    "password" : "String",
}
```

#### Quadro (Boards)
```json
{
    "_id" : "String" *UNIQUE,              // Id gerenciado pelo MongoDB
    "username" : "String" *FOREIGN_KEY,     // Usuário que criou o quadro.
    "title" : "String",
}
```

#### Usuário_Quadro (Users_Boards)
Tabela que une usuários e quadros.
```json
{
    "_id" : "String" *UNIQUE,              // Id gerenciado pelo MongoDB
    "board_id" : "String" *UNIQUE,
    "username" : "String" *FOREIGN_KEY,    // Usuário que criou o quadro.
}
```

#### Tarefa (Cards)
```json
{
    "_id" : "String" *UNIQUE,              // Id gerenciado pelo MongoDB
    "username" : "String" *FOREIGN_KEY,     // Usuário designado para esta tarefa.
    "board_id" : "Integer" *FOREIGN_KEY,    // Quadro do qual a tarefa faz parte.
    "title" : "String",                     // Tarefa simples, apenas com um título, sem outro detalhes.
    "column" : "Integer"                    // 1 = TODO, 2 = Doing, 3 = Done.
}
```
