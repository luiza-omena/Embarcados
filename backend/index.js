const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

const serviceAccount = require('./firebase-key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://projetoembarcados-16eb8-default-rtdb.firebaseio.com'
});

const db = admin.database();
const app = express();
app.use(cors())
app.use(bodyParser.json());
const PORT = 3002;

//requisições pre definidas
app.post('/postCriarUsuario', async (req, res) => {
    try {
        const refUsuarios = db.ref('/usuario/');
        const snapshot = await refUsuarios.once('value');
        const data = snapshot.val();
        const tamanho = data ? Object.keys(data).length : 0;
        const newData = req.body;
        const dataAtt = {
            id: tamanho,
            email: newData.email,
            senha: newData.senha,
        };

        try {
            const refNovoUsuario = db.ref(`/usuario/${tamanho}/`);
            await refNovoUsuario.set(dataAtt);
            res.status(200).send('Usuário criado com sucesso!');
        } catch (error) {
            res.status(500).send('Erro ao criar usuário: ' + error.message);
        }
    } catch (error) {
        res.status(500).send('Erro ao processar a solicitação: ' + error.message);
    }
});

app.post('/postCriarPerfil', async (req, res) => {
    try {
        const newData = req.body;
        const refPerfil = db.ref(`/usuario/${newData.idUsuario}/perfil/`);
        const snapshot = await refPerfil.once('value');
        const data = snapshot.val();
        const tamanho = data ? Object.keys(data).length : 0;
        const dataAtt = {
            id: tamanho,
            nome: newData.nome,
            quantidadePreDefinida: newData.quantidadePreDefinida,
            tipoPet: newData.tipoPet,
        };
        try {
            const refNovoPerfil = db.ref(`/usuario/${newData.idUsuario}/perfil/${tamanho}`);
            await refNovoPerfil.set(dataAtt);
            res.status(200).send('Perfil criado com sucesso!');
        } catch (error) {
            res.status(500).send('Erro ao criar o perfil: ' + error.message);
        }
    } catch (error) {
        res.status(500).send('Erro ao processar a solicitação: ' + error.message);
    }
});


//usuario
app.get('/getUsuario', async (req, res) => {
    try {
        const ref = db.ref('/usuario');
        const snapshot = await ref.once('value');
        const data = snapshot.val();
        res.status(200).json(data);
        console.log(data.length);
    } catch (error) {
        res.status(500).send('Erro ao buscar dados: ' + error.message);
    }
});

app.get('/getUsuario/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    try {
        const ref = db.ref(`/usuario/${idUsuario}`);
        const snapshot = await ref.once('value');
        const data = snapshot.val();

        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).send('Perfil não encontrado');
        }
    } catch (error) {
        res.status(500).send('Erro ao buscar dados: ' + error.message);
    }
});


//email
app.put('/putEmail', async (req, res) => {

    try {
        const updateData = req.body;
        const ref = db.ref(`/usuario/${updateData.idUsuario}/`);
        const data = {
            email:updateData.email
        }
        await ref.update(data);
        res.status(200).send("Dados atualizados com sucesso");
    } catch (error) {
        res.status(500).send('Erro ao atualizar dados: ' + error.message);
    }
});

app.get('/getEmail/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    try {
        const ref = db.ref(`/usuario/${idUsuario}/email`);
        const snapshot = await ref.once('value');
        const data = snapshot.val();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send('Erro ao buscar dados: ' + error.message);
    }
});

app.put('/putSenha/', async (req, res) => {
    try {
        const updateData = req.body;
        const ref = db.ref(`/usuario/${updateData.idUsuario}/`);
        const data = {
            senha:updateData.senha
        }
        await ref.update(data);
        res.status(200).send("Dados atualizados com sucesso");
    } catch (error) {
        res.status(500).send('Erro ao atualizar dados: ' + error.message);
    }
});

app.get('/getSenha/:idUsuario', async (req, res) => {
    const {idUsuario} = req.params;
    try {
        const ref = db.ref(`/usuario/${idUsuario}/senha`);
        const snapshot = await ref.once('value');
        const data = snapshot.val();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send('Erro ao buscar dados: ' + error.message);
    }
});

//perfil
app.put('/putPerfil', async (req, res) => {
    try {
        const updateData = req.body;
        const ref = db.ref(`/usuario/${updateData.idUsuario}/perfil/${updateData.id}`);
        const data = updateData;
        delete data.idUsuario;
        await ref.update(data);
        res.status(200).send("Dados atualizados com sucesso");
    } catch (error) {
        res.status(500).send('Erro ao atualizar dados: ' + error.message);
    }
});

app.get('/getPerfil/:idUsuario/:id', async (req, res) => {
    const {idUsuario} = req.params;
    const {id} = req.params;
    try {
        const ref = db.ref(`/usuario/${idUsuario}/perfil/${id}`);
        const snapshot = await ref.once('value');
        const data = snapshot.val();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send('Erro ao buscar dados: ' + error.message);
    }
});

app.get('/getPerfil/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    try {
        const ref = db.ref(`/usuario/${idUsuario}/perfil`);
        const snapshot = await ref.once('value');
        const data = snapshot.val();

        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).send('Perfil não encontrado');
        }
    } catch (error) {
        res.status(500).send('Erro ao buscar dados: ' + error.message);
    }
});

app.delete('/deletePerfil/:idUsuario/:idPerfil', async (req, res) => {
    const {idUsuario} = req.params;
    const {idPerfil} = req.params;
    try {
        const ref = db.ref(`/usuario/${idUsuario}/perfil/${idPerfil}`);
        const snapshot = await ref.once('value');
        if (snapshot.exists()) {
            await ref.remove();
            res.status(200).send('Perfil deletado com sucesso');
        } else {
            res.status(404).send('Perfil não encontrado');
        }
    } catch (error) {
        res.status(500).send('Erro ao deletar perfil: ' + error.message);
    }
});


//controlador do sistema
//estado
app.get('/getEstado', async (req, res) => {
    try {
        const ref = db.ref('/sistema/estado');
        const snapshot = await ref.once('value');
        const data = snapshot.val();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send('Erro ao buscar dados: ' + error.message);
    } 
});

app.put('/putEstado', async (req, res) => {
    try {
        const ref = db.ref('/sistema/estado');
        const updateData = req.body;
        await ref.update(updateData); // Atualiza apenas os campos fornecidos
        res.status(200).send("Dados atualizados com sucesso");
    } catch (error) {
        res.status(500).send('Erro ao atualizar dados: ' + error.message);
    }
});


//quantidade
app.get('/getQuantidade', async (req, res) => {
    try {
        const ref = db.ref('/sistema/quantidade');
        const snapshot = await ref.once('value');
        const data = snapshot.val();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send('Erro ao buscar dados: ' + error.message);
    }
});

app.put('/putQuantidade', async (req, res) => {
    try {
        const ref = db.ref('/sistema/quantidade');
        const updateData = req.body;
        await ref.update(updateData); // Atualiza apenas os campos fornecidos
        res.status(200).send("Dados atualizados com sucesso");
    } catch (error) {
        res.status(500).send('Erro ao atualizar dados: ' + error.message);
    }
});

//msg
app.get('/getMsg', async (req, res) => {
    try {
        const ref = db.ref('/sistema/msg');
        const snapshot = await ref.once('value');
        const data = snapshot.val();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send('Erro ao buscar dados: ' + error.message);
    }
});

app.put('/putMsg', async (req, res) => {
    try {
        const ref = db.ref('/sistema/msg');
        const updateData = req.body;
        await ref.update(updateData); // Atualiza apenas os campos fornecidos
        res.status(200).send("Dados atualizados com sucesso");
    } catch (error) {
        res.status(500).send('Erro ao atualizar dados: ' + error.message);
    }
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});