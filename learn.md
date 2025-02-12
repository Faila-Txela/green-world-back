 ## Aprendendo Nodejs com a Green World

   #DB;

import mysql from 'mysql2'


// Configuração do banco de dados
const db = mysql.createPool({
    host: 'localhost',     // IP ou domínio do banco de dados
    user: 'root',          // Usuário do MySQL
    password: '', // Senha do MySQL
    database: 'greenworld' // Nome do banco de dados
});

// Testar conexão
db.getConnection((err, connection) => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
    } else {
        console.log("Conexão feita com sucesso!");
        connection.release(); // Liberar conexão após o teste
    }
});

export default db;



  #SERVER:


  import express from 'express'
import * as db from './db.js' 
const app = express();


app.use(express.json()); // Permite JSON no body das requisições


app.get("/", async (req, res) => {

    //Tratamento de erro usando o try/catch

    try {
        await db.execute("INSERT INTO Users (nomeUser, emailUser, senha) VALUES ('Albertina Sauimbo', 'albertinasauimbo17@gmail.com', '1234567', '12h30min')");
        res.json({ message: "Usuário inserido com sucesso." });
    } catch (err) {

        console.error("Erro ao executar os scripts da BD:", err.message);
        res.status(500).json({ error: "Erro no banco de dados", details: err.message });
    }
});

app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});