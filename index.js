const { connectToDatabase } = require('./src/database/connection');
const Evento = require('./src/models/Evento');

async function main() {
    
    await connectToDatabase();

    console.log("\n--- TESTANDO CRIAÇÃO DE EVENTO ---");
    try {
        const novoEvento = new Evento(
            "Reunião de Projeto",
            new Date("2025-10-28T10:00:00Z"),
            "Discussão sobre o Projeto 1.",
            new Date("2025-10-28T11:00:00Z"),
            "id_do_calendario_aqui"
        );

        const resultado = await novoEvento.salvar();
        console.log("Evento criado com sucesso!", resultado.insertedId);

    } catch (error) {
        console.error(error.message);
    }

    console.log("\n--- TESTANDO BUSCA DE EVENTOS ---");
    try {
        const todosEventos = await Evento.buscarTodos();
        console.log("Eventos encontrados:", todosEventos);
    } catch (error) {
        console.error(error.message);
    }

    console.log("\n--- TESTANDO DELEÇÃO (use um ID válido do seu banco) ---");
    
    const idParaDeletar = "68e16a0e904c0e97f330b5ca";
    try {
        await Evento.deletarPorId(idParaDeletar);
        console.log(`Evento com ID ${idParaDeletar} deletado com sucesso.`);
    } catch (error) {
        console.error(error.message);
    }

    console.log("\n--- TESTANDO VALIDAÇÃO DE CAMPO OBRIGATÓRIO ---");
    try {
        const eventoInvalido = new Evento(null, null);
        await eventoInvalido.salvar();
    } catch (error) {
        console.error("Erro esperado:", error.message);
    }
}

main();