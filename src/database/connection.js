const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017"; // URI de conexão local
const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db('agenda_eletronica'); // Nome do seu banco de dados
        console.log("Conectado ao MongoDB com sucesso!");
    } catch (error) {
        console.error("Falha ao conectar ao MongoDB:", error);
        // Aqui você pode adicionar o logging do erro em um arquivo
        process.exit(1); // Encerra a aplicação se não conseguir conectar ao BD
    }
}

function getDb() {
    if (!db) {
        throw new Error("A conexão com o banco de dados não foi estabelecida.");
    }
    return db;
}

module.exports = { connectToDatabase, getDb };