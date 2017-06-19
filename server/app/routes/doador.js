module.exports = ( app ) => {
    app.get('/doadores', (req, res) => {
        console.log('Recebendo requisição GET em /doadores');
        res.status(200).render('formDoador');
    });

    app.get('/doadores/json', (req, res) => {
        console.log('Recebendo requisição GET em /doadores/json');
        let doadores = [
            {nome:'Yuri Cabral'}
        ];
        console.log(doadores);
        res.status(200).send(doadores);
    });

    app.get('/cadastro/doador', ( req, res ) => {
        res.status(301).redirect('/formDoador.html');
    });

    app.get('/formDoador.html', ( req, res ) => {
        res.render('formDoador');
    });
};