module.exports = ( app ) => {
    app.get('/index', ( req, res ) => {
        res.status(200).render('index');
    });
}