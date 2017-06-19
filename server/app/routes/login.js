module.exports = ( app ) => {
    app.get('/', ( req, res ) => {
        console.log('Recebendo requisição em /.');
        console.log('Redirecionando para /login.');
        res.status(301).redirect('/login');
    });
    
    app.get('/login', ( req, res ) => {
        res.status(200).render('login');
    });

    app.post('/login', ( req, res ) => {
        res.status(200).redirect('/index');
    })
};