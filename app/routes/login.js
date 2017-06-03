const path = require('path');
const SendFiles = require('./../../modules/SendFiles');

module.exports = ( app ) => {

    app.get('/:name', ( req, res, next ) => {
        return SendFiles( req, res );
    });
/*
    app.get('/', ( req, res ) => {
        console.log('Recebendo requisição em /.');
        console.log('Redirecionando para /login.');
        res.status(301).redirect('/login');
    });

    app.get('/login', ( req, res ) => {
        console.log('Recebendo requisição em /login.');
        res.sendFile(path.join(__dirname,'../../../public/partials/login.html'));
        res.status(200);
    });
*/
    app.post('/:name', ( req, res, next ) => {
        return SendFiles( req, res );
    });
};