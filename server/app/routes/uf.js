module.exports = (app) => {

    var uf = [
        {
            nome: 'SP'
        },
        {
            nome: 'RJ'
        },
        {  
            nome: 'ES'
        },
        {
            nome: 'MG'
        },
        {
            nome: 'BA'
        },
        {
            nome: 'PE'
        },
        {
            nome: 'TO'
        },
        {
            nome: 'GO'
        },
        {
            nome: 'DF'
        },
        {
            nome: 'AM'
        },
        {
            nome: 'PR'
        },
        {
            nome: 'SC'
        },
        {
            nome: 'RS'
        },
        {
            nome: 'RN'
        },
        {
            nome: 'MS'
        },
        {
            nome: 'MT'
        }
    ];

    app.get('/uf', function( req, res ) {
        //DESENHAR O QUE SERÁ FEITO
        console.log('Recebendo requisição GET em /uf');
        res.send( uf ).status(200);
    });

};