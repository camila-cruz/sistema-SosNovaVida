module.exports = ( app ) => {
    app.get('/', ( req, res ) => {
        console.log('Recebendo requisição em /.');
        console.log('Redirecionando para /login.');
        res.status(301).redirect('/login');
    });

    app.get('/login', ( req, res ) => {
        console.log('Recebendo requisição em /login.');
        res.render('login', {title: 'Be MEAN', message: 'Bem-vindo ao BE MEAN'});
        res.status(200);
    });
};