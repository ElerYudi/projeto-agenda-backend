const readline = require('readline');
const { connectToDatabase, closeDatabaseConnection } = require('./src/database/connection');
const Usuario = require('./src/models/Usuario');
const Categoria = require('./src/models/Categoria');
const Evento = require('./src/models/Evento');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
function askQuestion(query) { return new Promise(resolve => rl.question(query, resolve)); }

async function criarUsuario() {
    try {
        const nome = await askQuestion('Digite o nome do usuário: ');
        const email = await askQuestion('Digite o e-mail do usuário: ');
        const senha = await askQuestion('Digite a senha do usuário: ');
        const novoUsuario = new Usuario(nome, email, senha);
        const resultado = await novoUsuario.salvar();
        console.log(`\n Usuário '${nome}' criado com sucesso! ID: ${resultado.insertedId}\n`);
    } catch (error) {
        console.error(`\n Erro ao criar usuário: ${error.message}\n`);
    }
}

async function atualizarUsuario() {
    try {
        const id = await askQuestion('Digite o ID do usuário que deseja atualizar: ');
        const nome = await askQuestion('Digite o novo nome (ou pressione Enter para não alterar): ');
        const email = await askQuestion('Digite o novo e-mail (ou pressione Enter para não alterar): ');
        const novosDados = {};
        if (nome) novosDados.nome = nome;
        if (email) novosDados.email = email;
        if (Object.keys(novosDados).length === 0) {
            console.log("\nNenhum dado fornecido para atualização.\n");
            return;
        }
        await Usuario.atualizarPorId(id, novosDados);
        console.log(`\n Usuário atualizado com sucesso!\n`);
    } catch (error) {
        console.error(`\n Erro ao atualizar usuário: ${error.message}\n`);
    }
}

async function deletarUsuario() {
    try {
        const id = await askQuestion('Digite o ID do usuário que deseja deletar: ');
        await Usuario.deletarPorId(id);
        console.log(`\n Usuário deletado com sucesso!\n`);
    } catch (error) {
        console.error(`\n Erro ao deletar usuário: ${error.message}\n`);
    }
}

async function listarUsuarios() {
    try {
        const usuarios = await Usuario.buscarTodos();
        if (usuarios.length === 0) {
            console.log("\nNenhum usuário encontrado.\n");
            return;
        }
        console.log("\n--- Lista de Usuários ---");
        usuarios.forEach(u => console.log(`ID: ${u._id} | Nome: ${u.nome} | Email: ${u.email}`));
        console.log("-------------------------\n");
    } catch (error) {
        console.error(`\n Erro ao listar usuários: ${error.message}\n`);
    }
}

async function criarCategoria() {
    try {
        const nome = await askQuestion('Digite o nome da categoria (ex: Trabalho): ');
        const descricao = await askQuestion('Digite a descrição (opcional): ');
        const novaCategoria = new Categoria(nome, descricao);
        const resultado = await novaCategoria.salvar();
        console.log(`\n Categoria '${nome}' criada com sucesso! ID: ${resultado.insertedId}\n`);
    } catch (error) {
        console.error(`\n Erro ao criar categoria: ${error.message}\n`);
    }
}

async function atualizarCategoria() {
    try {
        const id = await askQuestion('Digite o ID da categoria a ser atualizada: ');
        const nome = await askQuestion('Novo nome (ou Enter para não alterar): ');
        const descricao = await askQuestion('Nova descrição (ou Enter para não alterar): ');
        const novosDados = {};
        if (nome) novosDados.nome = nome;
        if (descricao) novosDados.descricao = descricao;
        if (Object.keys(novosDados).length === 0) {
            console.log('\nNenhum dado fornecido para atualização.\n');
            return;
        }
        await Categoria.atualizarPorId(id, novosDados);
        console.log('\n Categoria atualizada com sucesso!\n');
    } catch (error) {
        console.error(`\n Erro ao atualizar categoria: ${error.message}\n`);
    }
}

async function deletarCategoria() {
    try {
        const id = await askQuestion('Digite o ID da categoria a ser deletada: ');
        await Categoria.deletarPorId(id);
        console.log('\n Categoria deletada com sucesso!\n');
    } catch (error) {
        console.error(`\n Erro ao deletar categoria: ${error.message}\n`);
    }
}

async function listarCategorias() {
    try {
        const categorias = await Categoria.buscarTodos();
        if (categorias.length === 0) { console.log("\nNenhuma categoria encontrada.\n"); return; }
        console.log("\n--- Lista de Categorias ---");
        categorias.forEach(c => console.log(`ID: ${c._id} | Nome: ${c.nome}`));
        console.log("---------------------------\n");
    } catch (error) {
        console.error(`\n Erro ao listar categorias: ${error.message}\n`);
    }
}

async function criarEvento() {
    try {
        console.log('\nDica: Para criar um evento, você precisa do ID de um usuário e de uma categoria.');
        const usuarioId = await askQuestion('Digite o ID do usuário: ');
        const categoriaId = await askQuestion('Digite o ID da categoria: ');
        const titulo = await askQuestion('Digite o título do evento: ');
        const dataInicio = await askQuestion('Data de início (AAAA-MM-DDTHH:MM): ');
        const dataFim = await askQuestion('Data de fim (AAAA-MM-DDTHH:MM): ');
        const local = await askQuestion('Local (opcional): ');
        const descricao = await askQuestion('Descrição (opcional): ');
        
        const novoEvento = new Evento(titulo, new Date(dataInicio), new Date(dataFim), usuarioId, categoriaId, descricao, local);
        const resultado = await novoEvento.salvar();
        console.log(`\n Evento '${titulo}' criado com sucesso! ID: ${resultado.insertedId}\n`);
    } catch (error) {
        console.error(`\n Erro ao criar evento: ${error.message}\n`);
    }
}

async function atualizarEvento() {
    try {
        const id = await askQuestion('Digite o ID do evento a ser atualizado: ');
        const titulo = await askQuestion('Novo título (ou Enter): ');
        const dataInicio = await askQuestion('Nova data de início (AAAA-MM-DDTHH:MM ou Enter): ');
        const dataFim = await askQuestion('Nova data de fim (AAAA-MM-DDTHH:MM ou Enter): ');
        const local = await askQuestion('Novo local (ou Enter): ');
        const descricao = await askQuestion('Nova descrição (ou Enter): ');
        const novosDados = {};
        if (titulo) novosDados.titulo = titulo;
        if (dataInicio) novosDados.dataInicio = new Date(dataInicio);
        if (dataFim) novosDados.dataFim = new Date(dataFim);
        if (local) novosDados.local = local;
        if (descricao) novosDados.descricao = descricao;
        if (Object.keys(novosDados).length === 0) {
            console.log('\nNenhum dado fornecido para atualização.\n');
            return;
        }
        await Evento.atualizarPorId(id, novosDados);
        console.log('\n Evento atualizado com sucesso!\n');
    } catch (error) {
        console.error(`\n Erro ao atualizar evento: ${error.message}\n`);
    }
}

async function deletarEvento() {
    try {
        const id = await askQuestion('Digite o ID do evento a ser deletado: ');
        await Evento.deletarPorId(id);
        console.log('\n Evento deletado com sucesso!\n');
    } catch (error) {
        console.error(`\n Erro ao deletar evento: ${error.message}\n`);
    }
}

async function buscarEventosPorPeriodo() {
    try {
        const inicio = await askQuestion('Data de início do período (AAAA-MM-DD): ');
        const fim = await askQuestion('Data de fim do período (AAAA-MM-DD): ');
        const eventos = await Evento.buscarPorPeriodo(inicio, `${fim}T23:59:59`);
        if (eventos.length === 0) { console.log("\nNenhum evento encontrado nesse período.\n"); return; }
        console.log(`\n--- Eventos de ${inicio} a ${fim} ---`);
        eventos.forEach(e => console.log(`ID: ${e._id} | Título: ${e.titulo} | Início: ${e.dataInicio.toLocaleString()}`));
        console.log("----------------------------------\n");
    } catch (error) {
        console.error(`\n Erro ao buscar eventos: ${error.message}\n`);
    }
}

async function listarEventos() {
    try {
        const eventos = await Evento.buscarTodos();
        if (eventos.length === 0) { console.log("\nNenhum evento encontrado.\n"); return; }
        console.log("\n--- Lista de Todos os Eventos ---");
        eventos.forEach(e => console.log(`ID: ${e._id} | Título: ${e.titulo} | UserID: ${e.usuarioId} | CategoriaID: ${e.categoriaId}`));
        console.log("---------------------------------\n");
    } catch (error) {
        console.error(`\n Erro ao listar eventos: ${error.message}\n`);
    }
}

async function handleUsuarioMenu() {
    while (true) {
        console.log('--- Gerenciar Usuários ---');
        console.log('1 - Criar Usuário');
        console.log('2 - Atualizar Usuário');
        console.log('3 - Deletar Usuário');
        console.log('4 - Listar Usuários');
        console.log('5 - Voltar ao Menu Principal');
        const escolha = await askQuestion('Escolha uma opção: ');
        switch (escolha) {
            case '1': await criarUsuario(); break;
            case '2': await atualizarUsuario(); break;
            case '3': await deletarUsuario(); break;
            case '4': await listarUsuarios(); break;
            case '5': return;
            default: console.log('\nOpção inválida.\n');
        }
    }
}

async function handleCategoriaMenu() {
    while (true) {
        console.log('--- Gerenciar Categorias ---');
        console.log('1 - Criar Categoria');
        console.log('2 - Atualizar Categoria');
        console.log('3 - Deletar Categoria');
        console.log('4 - Listar Categorias');
        console.log('5 - Voltar ao Menu Principal');
        const escolha = await askQuestion('Escolha uma opção: ');
        switch (escolha) {
            case '1': await criarCategoria(); break;
            case '2': await atualizarCategoria(); break;
            case '3': await deletarCategoria(); break;
            case '4': await listarCategorias(); break;
            case '5': return;
            default: console.log('\nOpção inválida.\n');
        }
    }
}

async function handleEventoMenu() {
    while (true) {
        console.log('--- Gerenciar Eventos ---');
        console.log('1 - Criar Evento');
        console.log('2 - Atualizar Evento');
        console.log('3 - Deletar Evento');
        console.log('4 - Listar Todos os Eventos');
        console.log('5 - Buscar Eventos por Período');
        console.log('6 - Voltar ao Menu Principal');
        const escolha = await askQuestion('Escolha uma opção: ');
        switch (escolha) {
            case '1': await criarEvento(); break;
            case '2': await atualizarEvento(); break;
            case '3': await deletarEvento(); break;
            case '4': await listarEventos(); break;
            case '5': await buscarEventosPorPeriodo(); break;
            case '6': return;
            default: console.log('\nOpção inválida.\n');
        }
    }
}

async function mainMenu() {
    while (true) {
        console.log('\n===== AGENDA ELETRÔNICA =====');
        console.log('1 - Gerenciar Usuários');
        console.log('2 - Gerenciar Categorias');
        console.log('3 - Gerenciar Eventos');
        console.log('4 - Sair');
        console.log('=============================');
        const escolha = await askQuestion('Escolha uma opção: ');
        switch (escolha) {
            case '1': await handleUsuarioMenu(); break;
            case '2': await handleCategoriaMenu(); break;
            case '3': await handleEventoMenu(); break;
            case '4': 
                console.log('Saindo...'); 
                await closeDatabaseConnection();
                rl.close(); 
                return;
            default: console.log('\nOpção inválida.');
        }
    }
}

async function start() {
    try {
        await connectToDatabase();
        await mainMenu();
    } catch (error) {
        console.error('Não foi possível iniciar a aplicação.', error);
        if (rl) rl.close();
    }
}

start();