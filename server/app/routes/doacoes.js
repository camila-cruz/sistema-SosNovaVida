const con = require('../database/db-factory');


module.exports = ( app ) => {

  app.get('/doacoes', ( req, res ) => {
    const doadores = [];

    con.query('SELECT d.*, dr.nome FROM doacao AS d, doador AS dr WHERE d.id_doador = dr.id;', [], ( err, results ) => {
      if ( err ) res.send( err );

      results.rows.forEach( doador => {
        doadores.push( doador );
      });

      return res.send( doadores ).status(200);
    });

  });

  app.post('/doacoes', ( req, res ) => {
    const doacao = req.body;
    console.log( 'Recebendo requisicao POST em /doacoes' );
    
    if ( doacao.nomeDoador === '' ) doacao.doador.id = -1;

    con.query('INSERT INTO DOACAO ( tipo, valor, qtd, descricao, data, id_doador ) values ( $1, $2, $3, $4, $5, $6 )', [ doacao.tipo, doacao.valor, doacao.qtd, doacao.descricao, new Date(), doacao.doador.id ], ( err ) => {
      if ( err ) return res.send( err ).status( 500 );

      return res.sendStatus( 200 );
    });

  });

}

/*
create table doacao(
    id smallserial primary key,
    tipo varchar(15) not null,
    valor decimal(7,2),
    descricao varchar(300),
    data date not null,
    id_doador int references doador(id),
    check (valor is not null or descricao is not null)
);
*/