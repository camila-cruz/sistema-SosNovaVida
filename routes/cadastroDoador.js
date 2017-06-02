module.exports = ( app ) => {
    app.get('/cadastro/doador', ( req, res ) => {
        console.log('Requisicão recebida em /cadastro/doador');
        res.render('views/login');
    })
};