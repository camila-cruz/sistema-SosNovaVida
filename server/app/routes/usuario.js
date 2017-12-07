const conn = require('../database/db-factory');

module.exports = ( app ) => {
  app.put('/usuario', ( req, res ) => {
    console.log( 'Recebendo requisição PUT em /usuario');
    const usuario = req.body;
    
    conn.query( 'UPDATE usuario SET nomeusuario=$1, senha=$2', [usuario.nomeUsuario, usuario.senha], ( err ) => {
      if ( err ) return console.log( err );

      console.log( 'Alterado com sucesso.' );
      return res.sendStatus( 200 )
    });
  });
    
  app.put('/usuario/login', ( req, res ) => {
    console.log( 'Recebendo requisição PUT em /usuario/login');

    const login = req.body.nomeUsuario;

    const query = 'UPDATE usuario SET nomeusuario=$1';
    conn.query( query, [login], ( err ) => {
      if ( err ) return console.log( err );

      console.log( 'Alterado com sucesso.' );
      return res.sendStatus( 200 )
    });
  });

  app.put('/usuario/senha', ( req, res ) => {
    console.log( 'Recebendo requisição PUT em /usuario/senha');
    
    const senha = req.body.senha;

    const query = 'UPDATE usuario SET senha=$1';
    conn.query( query, [senha], ( err ) => {
      if ( err ) return console.log( err );

      console.log( 'Alterado com sucesso.' );
      return res.sendStatus( 200 )
    });
  });

  app.get('/usuario/senha', ( req, res ) => {
    console.log( 'Recebendo requisição GET em /usuario/senha');

    const query = 'SELECT senha FROM usuario WHERE id=1';
    conn.query(query, [], (err, result) => {
      if ( err ) return console.log( err );
      console.log(result.rows[0].senha);
      let pac = result.rows[0].senha;
      
      return res.status( 200 ).send(result.rows[0].senha);
    });
  });
};