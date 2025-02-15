import express from 'express';
import cors from 'cors';
import connectDB from './db.js';

const app = express();

app.use(express.json());
app.use(cors());

let banco;

(async () => {
    try {
        banco = await connectDB();
        console.log('✅ Conectado ao banco de dados');

        // Iniciar servidor apenas após conexão com banco
        app.listen(3000, () => {
            console.log('🚀 Servidor rodando na porta 3000');
        });

    } catch (err) {
        console.error('❌ Erro ao conectar ao banco de dados:', err);
        process.exit(1); // Encerra o processo em caso de erro crítico
    }
})();

// Listar todos os registros
app.get('/lixoamontoado', async (req, res) => {
    try {
        const [result] = await banco.execute('SELECT * FROM Lixoamontoado');
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Criar um novo registro
app.post('/lixoamontoado', async (req, res) => {
    try {
        const { latitude, longitude, descricao, status_lixo, primeira_emissao, final_emissao, idUser1, foto } = req.body;
        const sql = "INSERT INTO Lixoamontoado (latitude, longitude, descricao, status_lixo, primeira_emissao, final_emissao, idUser1, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const [result] = await banco.query(sql, [latitude, longitude, descricao, status_lixo, primeira_emissao, final_emissao, idUser1, foto]);

        res.json({ id: result.insertId, latitude, longitude, descricao, status_lixo, primeira_emissao, final_emissao, idUser1, foto });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Atualizar um registro
app.put('/lixoamontoado/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status_lixo } = req.body;
        const sql = 'UPDATE Lixoamontoado SET status_lixo = ? WHERE id_lixo = ?';
        await banco.query(sql, [status_lixo, id]);

        res.json({ message: 'Registro atualizado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Excluir um registro
app.delete('/lixoamontoado/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'DELETE FROM Lixoamontoado WHERE id_lixo = ?';
        await banco.query(sql, [id]);

        res.json({ message: 'Registro excluído com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

