# 📊 Projeto: Enquete Rápida

Aplicação Full-Stack (Node.js + Express + MySQL + HTML/CSS/JS) para votação simples e visualização de resultados em tempo quase real (polling).

## ✨ Funcionalidades
- API RESTful: `GET /api/votos` e `POST /api/votar/:opcao`
- Frontend mobile-first com botões grandes
- Atualização automática dos resultados via polling
- Servido pelo próprio Express (pasta `public/`)

## 🚀 Como rodar
```bash
npm init -y
npm install express mysql2 cors
node index.js
```

Acesse: `http://localhost:3000`

## 🗃️ Banco de Dados
```sql
CREATE DATABASE IF NOT EXISTS enquete_db;
USE enquete_db;
CREATE TABLE IF NOT EXISTS tbl_votos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  opcao_nome VARCHAR(100) NOT NULL UNIQUE,
  total_votos INT DEFAULT 0
);
INSERT INTO tbl_votos (opcao_nome, total_votos) VALUES
  ('JavaScript', 0),
  ('Python', 0),
  ('SQL', 0);
```

## 🧑‍💻 Autoria (comprovando que você fez)
Para mostrar ao professor que **você** fez:
1. Configure seu Git com seu nome e e-mail:
   ```bash
   git init
   git config user.name "Karen Gentil Ferreira dos Santos"
   git config user.email "seu.email@exemplo.com"
   git add .
   git commit -m "Projeto Enquete Rápida: backend + frontend"
   ```
2. Crie um arquivo `AUTHORS.txt` e `CHANGELOG.md` (já gerados) com sua assinatura e datas.
3. Inclua prints de tela (screenshots) e salve em `docs/` (pasta criada).
4. Use comentários marcados com sua assinatura (ver `index.js`, `script.js`).
5. Opcional: suba para um repositório privado no GitHub e mostre o histórico de commits.

## 📱 Teste em celular (mesma rede Wi‑Fi)
- Descubra seu IP local (Windows: `ipconfig`, macOS/Linux: `ifconfig`/`ip a`).
- Acesse via celular: `http://SEU-IP:3000`.

## 🔒 Variáveis de ambiente (opcional)
Crie `.env` baseado em `.env.example` e exporte antes de rodar:
```
DB_HOST=localhost
DB_USER=root
DB_PASS=seu-password-aqui
DB_NAME=enquete_db
DB_PORT=3306
PORT=3000
```

