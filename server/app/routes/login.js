const conn = require('../database/db-factory');

module.exports = ( app ) => {
    app.post('/login', ( req, res ) => {
        console.log('Recebendo requisição POST em /login.');

        const dados = req.body;

        conn.query( 'SELECT senha FROM CONFIGS WHERE NOMEUSUARIO = $1', [ dados.nomeUsuario ], ( err, results ) => {
            if (err) return res.send( err );

            const senha = results.rows[0].senha; 
            if ( dados.senha != senha ) {
                return res.send('Senha incorreta').statusCode( 401 );
            }
            return res.statusCode( 202 );
        });
        return;
    })
};