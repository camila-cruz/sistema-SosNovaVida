module.exports = (app) => {

    var uf = [
        {
            nome: 'São Paulo'
        },
        {
            nome: 'Rio de Janeiro'
        },
        {  
            nome: 'Espirito Santo'
        },
        {
            nome: 'Minas Gerais'
        },
        {
            nome: 'Bahia'
        }
    ];

    app.get('/uf', function( req, res ) {
        //DESENHAR O QUE SERÁ FEITO
        console.log('Recebendo requisição GET em /uf');
        res.send( uf ).status(200);
    });

};