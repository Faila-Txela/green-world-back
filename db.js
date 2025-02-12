import mysql from 'mysql2/promise';

// Configuração do banco de dados
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '', // Coloque a senha correta do seu MySQL
    database: 'greenworld'
};

// Criar conexão assíncrona
export const connectDB = async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log("✅ Conexão feita com sucesso!");
        return connection;
    } catch (error) {
        console.error("❌ Erro ao conectar no banco de dados:", error.message);
        process.exit(1); // Encerra o processo se não conectar
    }
};


export default connectDB;