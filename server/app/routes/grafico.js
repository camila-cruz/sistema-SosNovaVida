const con = require('../database/db-factory.js');

module.exports = (app) => {
  app.get( '/grafico/estoque', ( req, res ) => {
    console.log( 'Recebendo requisição GET em /grafico/estoque');

    const produtos = [];
    con.query('SELECT descricao, SUM(qtd) AS qtd FROM movimentacao WHERE tipo=$1 GROUP BY descricao ORDER BY qtd desc limit 5', ['SAIDA'], ( err, results ) => {
      if (err) {
        //return res.status(500);
        // Exibe tela mesmo com erro
        return res.status(200).send(produtos);
      }

      results.rows.forEach( ( element ) => {
        produtos.push( element ); 
      });
      return res.status(200).send( produtos );
    });
  });

  app.get( '/grafico/acolhidos/:jota', (req, res) => {
    const jota = req.params.jota;
    const acolhidos = [];
    console.log("jotas: " + jota);

    con.query("select count(*) as qtd from acolhido where date_part('month', data_entrada) <= date_part('month', current_date)-$1 and date_part('year', data_entrada) <= date_part('year', current_date) and date_part('month', data_saida) >= date_part('month', current_date)-$1 and date_part('year', data_saida) = date_part('year', current_date)", [jota], ( err, results ) => {
      if (err) {
        //return res.status(500);
        // Exibe tela mesmo com erro
        console.log("erro: " + err);
        return res.status(200).send(acolhidos);
      }

      console.log("resultado: " + results.rows[0].qtd);
      return res.status(200).send(results.rows[0].qtd);
      //console.log("jota: " + jota + " acolhidos: " + acolhidos);
      //return res.status(200).send( acolhidos )
    });
  });
};