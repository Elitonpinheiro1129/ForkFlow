const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'contatos.json');

// Middlewares
app.use(cors());
app.use(express.json());

// Endpoint POST /contatos
app.post('/contatos', (req, res) => {
    const novoContato = req.body;

    // 1. Verificar se o arquivo existe, se não, criar com array vazio
    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2));
    }

    // 2. Ler os dados atuais
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler arquivo:', err);
            return res.status(500).send('Erro interno do servidor.');
        }

        let contatos = [];
        try {
            contatos = JSON.parse(data);
        } catch (parseErr) {
            console.error('Erro ao parsear JSON:', parseErr);
            contatos = [];
        }

        // 3. Adicionar o novo registro
        contatos.push(novoContato);

        // 4. Salvar de volta no arquivo
        fs.writeFile(FILE_PATH, JSON.stringify(contatos, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Erro ao salvar arquivo:', writeErr);
                return res.status(500).send('Erro ao salvar contato.');
            }
            
            console.log('Novo contato salvo:', novoContato.nome);
            res.status(201).send('Contato salvo com sucesso!');
        });
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ForkFlow rodando em http://localhost:${PORT}`);
    console.log(`Endpoint de contatos pronto em http://localhost:${PORT}/contatos`);
});
