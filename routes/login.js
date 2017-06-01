module.exports = ( app ) => {
    app.get('/login', ( req, res ) => {
        console.log('Requisicão recebida em /login');
        res.render('login');
    })
};