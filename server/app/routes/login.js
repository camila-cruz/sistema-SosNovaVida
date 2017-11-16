const conn = require('../database/db-factory');

module.exports = ( app ) => {
    app.post('/login', ( req, res ) => {
        console.log('Recebendo requisição POST em /login.');

        const usuario = req.body;

        conn.query( 'SELECT * FROM usuario WHERE NOMEUSUARIO = $1', [ usuario.nomeusuario ], ( err, results ) => {
            if (err) return res.send( err );
            
            if ( results.rows.length === 0 ) return res.sendStatus( 404 );
            // Significa que não achou no banco

            
            const login = results.rows[0].nomeusuario
            const senha = results.rows[0].senha; 

            if ( senha !== usuario.senha ) {
                return res.sendStatus( 401 ); // Significa que a senha está errada.
            }
             
            res.sendStatus( 202 );
        });
    })
};