const con = require('../database/db-factory.js');

module.exports = (app) => {
  app.get( '/grafico/estoque', ( req, res ) => {
    const produtos = [];
    con.query('SELECT * FROM estoque', null, ( err, results ) => {
      //   alterar    ^ para o nome dos campos que guardam o produto e a quantidade no estoque.
      if (err) return res.status(500);

      results.rows.forEach( ( element ) => {
        produtos.push( element ); 
      });

      return res.status(200).send( estoque )
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