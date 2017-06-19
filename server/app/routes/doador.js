const mongoose = require('../../config/database');

module.exports = ( app ) => {
    app.get('/doadores', (req, res) => {
        console.log('Recebendo requisição GET em /doadores');
        mongoose.connect();
    });

    app.get('/doadores/json', (req, res) => {
        console.log('Recebendo requisição GET em /doadores/json');
        let doadores = [
            {nome:'Yuri Cabral'}
        ];
        console.log(doadores);
        res.status(200).send(doadores);
    });

    app.get('/formDoador', (req, res) => {
        console.log('Recebendo requisição GET em /formDoador');
        console.log('Redirecionando para /cadastro/doador');
        res.status(301).redirect('/cadastro/doador');
    });

    app.get('/cadastro/doador', ( req, res ) => {
        console.log('Recebendo requisição GET em /cadastro/doador');
        res.render('formDoador');
    });
};