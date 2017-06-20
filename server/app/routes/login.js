module.exports = ( app ) => {
    app.get('/', ( req, res ) => {
        console.log('Recebendo requisição em /.');
        console.log('Redirecionando para /login.');
        res.status(301).redirect('/login');
    });
    
    app.get('/login', ( req, res ) => {
        console.log('Recebendo requisição GET em /login');
        res.status(200).render('login');
    });

    app.post('/login', ( req, res ) => {
        console.log('Recebendo requisição POST em /login');
        console.log('Logado com sucesso, redirecionando para /index');
        res.status(200).redirect('/index');
    })

};