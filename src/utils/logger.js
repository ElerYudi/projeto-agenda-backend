// src/utils/logger.js
const fs = require('fs');
const path = require('path');

// Caminho para o diretório de logs
const logDirectory = path.join(__dirname, '../logs');
// Caminho completo para o arquivo de log
const logFilePath = path.join(logDirectory, 'exceptions.log');

function logError(error) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ERRO: ${error.stack || error}\n\n`;

    try {
        // Verifica se o diretório de logs existe. Se não, cria-o.
        if (!fs.existsSync(logDirectory)) {
            fs.mkdirSync(logDirectory);
        }

        // Agora, escreve no arquivo de log
        fs.appendFileSync(logFilePath, logMessage);

    } catch (err) {
        console.error('Falha CRÍTICA ao gravar o log de erro:', err);
    }
}

module.exports = { logError };