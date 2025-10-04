const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db('agenda_eletronica');
        console.log("Conectado ao MongoDB com sucesso!");
    } catch (error) {
        console.error("Falha ao conectar ao MongoDB:", error);
        process.exit(1);
    }
}

function getDb() {
    if (!db) {
        throw new Error("A conex達o com o banco de dados n達o foi estabelecida.");
    }
    return db;
}

async function closeDatabaseConnection() {
    try {
        await client.close();
        console.log("Conex達o com o MongoDB fechada.");
    } catch (error) {
        console.error("Erro ao fechar a conex達o com o MongoDB:", error);
    }
}

module.exports = { connectToDatabase, getDb, closeDatabaseConnection };