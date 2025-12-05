// index.js (Backend API)

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Config DB (adjust credentials or use env vars)
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'seu-password-aqui', // <--- MUDAR AQUI
  database: process.env.DB_NAME || 'enquete_db',        // <--- MUDAR AQUI
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool;
(async () => {
  try {
    pool = mysql.createPool(dbConfig);
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log('✅ Conectado ao MySQL.');
  } catch (err) {
    console.error('❌ Erro ao conectar ao MySQL:', err.message);
    process.exit(1);
  }
})();

// GET /api/votos
app.get('/api/votos', async (req, res) => {
  console.log('Recebida requisição GET /api/votos');
  try {
    const [rows] = await pool.query('SELECT opcao_nome, total_votos FROM tbl_votos');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar votos:', error);
    res.status(500).json({ message: 'Erro ao buscar votos.' });
  }
});

// POST /api/votar/:opcao
app.post('/api/votar/:opcao', async (req, res) => {
  const opcao = req.params.opcao;
  console.log(`Recebido voto para: ${opcao}`);
  try {
    const [result] = await pool.query(
      'UPDATE tbl_votos SET total_votos = total_votos + 1 WHERE opcao_nome = ?',
      [opcao]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Opção de voto não encontrada.' });
    }

    res.status(200).json({ message: `Voto para ${opcao} registrado com sucesso!` });
  } catch (error) {
    console.error(`Erro ao votar em ${opcao}:`, error);
    res.status(500).json({ message: 'Erro ao registrar voto.' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
  console.log('Sirva o frontend abrindo http://localhost:3000 no seu navegador.');
});
