module.exports = ( app ) => {
    app.get('/formAcolhido', (req, res) => {
        console.log('Recebendo requisicao em /formAcolhido');
        console.log('Redirecionando para /cadastro/acolhido');
        res.status(301).redirect('/cadastro/acolhido');
    });

    app.get('/cadastro/acolhido', (req, res) => {
        console.log('Recebendo requisição em /cadastro/acolhido');
        res.status(200).render('formAcolhido');
    });
}