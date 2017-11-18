const con = require('../database/db-factory.js');

module.exports = (app) => {
  app.get( '/grafico/estoque', ( req, res ) => {
    console.log( 'Recebendo requisição GET em /grafico/estoque');

    const produtos = [];
    con.query('SELECT descricao, qtd FROM estoque order by qtd desc LIMIT 5', null, ( err, results ) => {
      if (err) return res.status(500);

      results.rows.forEach( ( element ) => {
        produtos.push( element ); 
      });

      console.log( produtos );

      return res.status(200).send( produtos );
    });
  });

  app.get( '/grafico/acolhidos', (req, res) => {
    const acolhidos = [];
    con.query('SELECT count(*) FROM acolhido WHERE dataSaida <= Date() and' + 
              ' dataEntrada >= Month(-1)', null, ( err, results ) => {
      // validar a query acima, provavelmente as funções Date() e Month(-1) darão erro
      if (err) return res.status(500);
      
      results.rows.forEach( (element) => {
        acolhidos.push( element );
      });

      return res.status(200).send( acolhidos )
    });
  });
};