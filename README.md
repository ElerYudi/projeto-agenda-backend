# Projeto 1: Agenda Eletrônica (Back-End)

[cite_start]Este é o repositório do **Projeto 1** da disciplina de **Programação Web Back-End (EC48B-C71)** [cite: 6][cite_start], da Universidade Tecnológica Federal do Paraná (UTFPR), Campus Cornélio Procópio[cite: 1, 2].

[cite_start]O objetivo do projeto é desenvolver uma biblioteca de classes em Node.js para acesso e manipulação de um banco de dados, sem o uso de frameworks web como o Express.js[cite: 9]. O sistema foi desenvolvido como uma interface de linha de comando (CLI) interativa para gerenciar uma agenda eletrônica, permitindo o cadastro de usuários, categorias e eventos.

---

## 👥 Autores

| Nome | RA |
| :--- | :--- |
| Éler Yudi Mitani Sotoma | 2312034 |
| Guilherme Renato Terra de Macedo | 2313030 |

---

## ✨ Funcionalidades

A aplicação é uma interface de linha de comando (CLI) que permite gerenciar três entidades principais: Usuários, Categorias e Eventos.

* **Gerenciamento de Usuários:**
    * Criar, atualizar, deletar e listar usuários.
    * Validação de e-mail único.

* **Gerenciamento de Categorias:**
    * Criar, atualizar, deletar e listar categorias para os eventos (ex: Trabalho, Pessoal, Lazer).
    * Validação de nome único para categoria.

* **Gerenciamento de Eventos:**
    * Criar, atualizar e deletar eventos, associando-os a um usuário e a uma categoria.
    * Listar todos os eventos cadastrados.
    * **Busca de eventos por período (dia/mês/ano)**.

* **Requisitos da Disciplina Atendidos:**
    * [cite_start]Implementação de no mínimo 3 classes de armazenamento (`Usuario`, `Categoria`, `Evento`). [cite: 26]
    * [cite_start]Verificação de preenchimento de campos obrigatórios. [cite: 29]
    * [cite_start]Tratamento de exceções. [cite: 30]
    * [cite_start]Armazenamento de logs de erro em um arquivo (`/logs/exceptions.log`). [cite: 31]

---

## 🛠️ Tecnologias Utilizadas

* **Node.js:** Ambiente de execução para o JavaScript no lado do servidor.
* **MongoDB:** Banco de dados NoSQL orientado a documentos.
* **MongoDB Driver (Node.js):** Biblioteca oficial para a comunicação entre a aplicação e o banco de dados.

---

## ⚙️ Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
* [Node.js](https://nodejs.org/en/) (v18 ou superior)
* [MongoDB Community Server](https://www.mongodb.com/try/download/community)
* [Git](https://git-scm.com/)

Opcionalmente, instale o [MongoDB Compass](https://www.mongodb.com/products/compass) para visualizar e gerenciar o banco de dados de forma gráfica.

---

## 🚀 Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/ElerYudi/projeto-agenda-backend.git
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd nome-do-projeto
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor do MongoDB:**
    * Certifique-se de que o serviço do MongoDB está rodando na sua máquina. A aplicação tentará se conectar em `mongodb://localhost:27017`.

5.  **Execute a aplicação:**
    ```bash
    node index.js
    ```

Após executar o comando, o menu interativo da agenda eletrônica será exibido no seu terminal.

---

## 📂 Estrutura de Arquivos

```
/
├── src/
│   ├── database/
│   │   └── connection.js   # Configuração da conexão com o MongoDB
│   ├── models/
│   │   ├── Usuario.js      # Model da entidade Usuário
│   │   ├── Categoria.js    # Model da entidade Categoria
│   │   └── Evento.js       # Model da entidade Evento
│   └── utils/
│       └── logger.js       # Sistema de log de erros
├── logs/
│   └── exceptions.log      # Arquivo onde os erros são gravados
├── node_modules/
├── .gitignore
├── index.js                # Ponto de entrada da aplicação (CLI interativa)
├── package.json
└── README.md
```