import express from 'express';
import connectDB from './db.js';

const app = express();
app.use(express.json());

let db;

// Conectando ao banco ANTES de iniciar as rotas
(async () => {
    db = await connectDB();
})();

// Endpoint para inserir usuário no banco
app.get("/user", async (req, res) => {
    try {
        if (!db) {
            return res.status(500).json({ error: "Banco de dados não conectado" });
        }

        const [result] = await db.execute(
            "INSERT INTO Users (nomeUser, emailUser, senha, cadastroTime) VALUES ('Txela', 'albertinasauimbo17@gmail.com', '1234567',NOW())",
        );

        res.json({ message: "Usuário inserido com sucesso.", insertId: result.insertId });
    } catch (err) {
        console.error("Erro ao executar os scripts da BD:", err.message);
        res.status(500).json({ error: "Erro no banco de dados", details: err.message });
    }
});

app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});
