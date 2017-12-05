const con = require('../database/db-factory');


module.exports = ( app ) => {
  app.get('/lista/estoque', ( req, res ) => {
    console.log('Recebendo requisição GET em /lista/estoque');

    const listas = [];

    con.query('SELECT * FROM lista_produtos', [], ( err, result ) => {
      if( err ) return console.log( err );
      
      result.rows.forEach( lista => listas.push( lista ) );

      res.send( listas );
    });
  });

  app.get('/lista/estoque/:id', ( req, res ) => {
    const id = req.params.id;
    console.log('Recebendo requisição GET em /lista/estoque/' + id );

    con.query('SELECT * FROM lista_produtos WHERE id=$1', [ id ], ( err, result ) => {
      if( err ) return console.log( err );

      const lista = result.rows[0];

      res.send( lista );
    });
  });

  app.post('/lista/estoque', ( req, res ) => {
    console.log('Recebendo requisição POST em /lista/estoque');
    const lista = req.body;
    
    const produtos = [];
    const qtds = [];

    lista.produtos.forEach( item => {
      produtos.push( item.descricao );
      qtds.push( item.qtdAlterar );
    })

    con.query("INSERT INTO lista_produtos (nome, produtos, qtd) VALUES ( $1, $2, $3 )", [ lista.nome, "{" + produtos + "}", "{" + qtds + "}" ], ( err ) => {
      if( err ) return console.log( err );

      res.sendStatus( 200 );
    });

  });

  app.put( '/lista/estoque/:id', ( req, res ) => {
    const id = req.params.id;
    const lista = req.body;
    const produtos = [];
    const qtds = [];

    console.log('Recebendo requisição PUT em /lista/estoque/' + id ); 

    lista.produtos.forEach( item => {
      produtos.push( item.descricao );
      qtds.push( item.qtdAlterar );
    })


    con.query('UPDATE lista_produtos SET nome=$1, produtos=$2, qtd=$3 WHERE id=$4', [ lista.nome, "{" + produtos + "}", "{" + qtds + "}", id ], ( err ) => {
      if ( err ) return console.log( err );

      res.sendStatus( 200 );
    });
  });
  
  app.delete( '/lista/estoque/:id', ( req, res ) => {
    const id = req.params.id;
    console.log( 'Recebendo requisição DELETE em /lista/estoque/' + id );

    con.query( 'DELETE FROM lista_produtos WHERE id=$1', [id], ( err ) => {
      if ( err ) return console.log( err );

      res.sendStatus( 200 );
    });

  });
  
  // ------------------------- ACOLHIDO ------------------------

  app.post('/lista/acolhido', ( req, res ) => {
    console.log('Recebendo requisição POST em /lista/acolhido');
    const lista = req.body;

    con.query('INSERT INTO lista_acolhidos VALUES ( $1, $2, $3 )', [ lista.nome, lista.acolhidos, new Date() ], ( err ) => {
      if( err ) return console.log( err );
    });
  });

};