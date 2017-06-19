module.exports = ( app ) => {
    app.get('/index', ( req, res ) => {
        console.log('Recebendo requisição em /index');
        res.status(200).render('index');
    });

    app.get('/cadastro/index', (req, res) => {
        console.log('Recebendo requisição em /cadastro/index');
        res.status(301).redirect('/index');
    });
}