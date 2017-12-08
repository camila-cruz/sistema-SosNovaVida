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

  app.post('/lista/acolhido/:nome', ( req, res ) => {
    console.log('Recebendo requisição POST em /lista/acolhido');
    const lista = req.body;
    console.log( 'Lista:', req.params.nome );

    const acolhidos = []

    lista.forEach( acolhido => acolhidos.push(acolhido.id) );

    con.query('INSERT INTO lista_acolhidos ( nome, id_acolhido, data ) VALUES ( $1, $2, $3 )', [ req.params.nome, "{" + acolhidos + "}", new Date() ], ( err ) => {
      if( err ) return console.log( err );

      return res.sendStatus( 200 );
    });
  });

  app.get('/lista/acolhido/:id', ( req, res ) => {
    const id = req.params.id;
    console.log('Recebendo requisição GET em /lista/acolhido/' + id);
  
    con.query( 'SELECT * FROM lista_acolhidos WHERE id=$1;', [ id ], ( err, results ) => {
      if (err) res.sendStatus( 500 );

      const lista = results.rows[0];

      con.query( 'SELECT aco.id, aco.nome, data_nasc, camiseta, calca, intima, calcado FROM acolhido aco JOIN lista_acolhidos lista ON aco.id = ANY(lista.id_acolhido) WHERE lista.id = $1;', [ id ], ( err2, result2 ) => {
        if (err2) console.log( err2 );
        const acolhidos = [];
        result2.rows.forEach( acolhido => {
          acolhidos.push( acolhido );
        });
        
        lista.acolhidos = [];
        lista.acolhidos.push( acolhidos );
        res.send( lista );
      });
    });
  });

  app.get('/lista/acolhido', ( req, res ) => {
    console.log('Recebendo requisição GET em /lista/acolhido');
  
    const listas = [];

    con.query( 'SELECT nome, id FROM lista_acolhidos;', [], ( err, results ) => {
      if (err) return res.sendStatus( 500 );

      results.rows.forEach( lista => listas.push( lista ) );

      return res.send( listas );
    })
  });

  app.delete( '/lista/acolhido/:id', ( req, res ) => {
    const id = req.params.id;
    console.log( 'Recebendo requisição DELETE em /lista/acolhido/' + id );

    con.query( 'DELETE FROM lista_acolhidos WHERE id=$1', [id], ( err ) => {
      if ( err ) return console.log( err );

      res.sendStatus( 200 );
    });

  });

  app.put( '/lista/acolhido/:id', ( req, res ) => {
    const id = req.params.id;
    const lista = req.body;
    const id_acolhidos = [];

    console.log('Recebendo requisição PUT em /lista/acolhido/' + id ); 
    console.log( lista );
    lista.acolhidos.forEach( acolhido => {
      id_acolhidos.push(acolhido.id);
    })

    con.query('UPDATE lista_acolhidos SET nome=$1, id_acolhidos=$2 WHERE id=$3', [ lista.nome, "{" + id_acolhidos + "}", id ], ( err ) => {
      if ( err ) return console.log( err );

      res.sendStatus( 200 );
    });
  });

};