module.exports = ( app ) => {
    app.get('/cadastro/acolhido', ( req, res ) => {
        res.status(300).redirect('/formAcolhido.html');
    });

    app.get('/formAcolhido.html', ( req, res ) => {
        res.status(200);
        return SendFiles( req, res );
    });
}