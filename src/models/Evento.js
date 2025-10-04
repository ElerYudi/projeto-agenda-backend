const { getDb } = require('../database/connection');
const { logError } = require('../utils/logger');
const { ObjectId } = require('mongodb');

class Evento {
    constructor(titulo, data_inicio, descricao = '', data_fim = null, id_calendario) {
        this.titulo = titulo;
        this.data_inicio = data_inicio;
        this.descricao = descricao;
        this.data_fim = data_fim;
        this.id_calendario = id_calendario;
    }

    // Método para validar campos obrigatórios
    validar() {
        if (!this.titulo || !this.data_inicio) {
            throw new Error("Campos obrigatórios (título e data de início) não foram preenchidos.");
        }
        return true;
    }

    // Método para salvar um evento no banco de dados
    async salvar() {
        try {
            this.validar(); // Verificação de campos obrigatórios 
            const db = getDb();
            const collection = db.collection('eventos');
            const resultado = await collection.insertOne(this);
            return resultado;
        } catch (error) {
            logError(error); // Armazena a exceção em um arquivo de log 
            throw new Error("Ocorreu um erro ao salvar o evento."); // Lança um erro genérico para a aplicação
        }
    }

    // Método estático para buscar todos os eventos
    static async buscarTodos() {
        try {
            const db = getDb();
            const collection = db.collection('eventos');
            return await collection.find({}).toArray();
        } catch (error) {
            logError(error); // Tratamento de exceções 
            throw new Error("Ocorreu um erro ao buscar os eventos.");
        }
    }

    // Método estático para deletar um evento por ID
    static async deletarPorId(id) {
        try {
            const db = getDb();
            const collection = db.collection('eventos');
            const resultado = await collection.deleteOne({ _id: new ObjectId(id) });
            if (resultado.deletedCount === 0) {
                throw new Error("Evento não encontrado para deleção.");
            }
            return resultado;
        } catch (error) {
            logError(error);
            throw new Error("Ocorreu um erro ao deletar o evento.");
        }
    }
}

module.exports = Evento;