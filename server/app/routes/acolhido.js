//const pg = require('pg');
const path = require('path');
const con = require('../database/db-factory.js');
//const connectionString = process.env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/tcc';

module.exports = ( app ) => {
    app.get('/acolhidos', (req, res, next) => {
        console.log('Recebendo requisição GET em /acolhidos');
        const acolhidos = [];

        try {
            con.query('SELECT * FROM acolhido ORDER BY id ASC;', null, function(err, result){
                if (err) {
                    console.log(err.message);
                    //return res.status(500).json({success: false, data: err});

                    // Renderiza a página corretamente apesar do erro
                    return res.json(acolhidos);
                    res.send(acolhidos).status(200);
                } else {
                    result.rows.forEach( (elemento) => {
                        acolhidos.push(elemento);
                    });
                    //let linhas = result.rows[0];
                    //acolhidos.push(linhas);
    
                    return res.json(acolhidos);
                    res.send(acolhidos).status(200);
                };
            });
        }
        catch (err) {
            return res.json(acolhidos);
            res.send(acolhidos).status(200);
        }
    });
    
    app.get('/acolhidos/:id', (req, res) => {
        let id = req.params.id;
        console.log('Recebendo requisição GET em /acolhidos/' + id);
        // Get a Postgres client from the connection pool
        con.query('SELECT * FROM acolhidos WHERE idacolhido = $1;', [id], ( err, results ) => {
            if (err) return res.status(500).send(err);

            console.log( results.rows[0]);
            return res.status(200).send(results.rows[0]);
        });
    });

    app.post('/acolhidos', (req, res, next) => {
        const data = req.body;
        console.log("data.nome: " + data.nome);

        con.query('INSERT INTO acolhidos (nome, data_nasc, data_entrada, local_nasc, uf, nome_mae, maeresp, nome_pai, pairesp, nomeresp) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
                [data.nome, data.dtNasc, data.dtEntr, data.cidNatal, data.uf.nome, data.nomeMae, data.isMaeResp, data.nomePai, data.isPaiResp, data.outroResp], function (err, result) {
            
            if (err) {
                console.log(err.message);
                return res.status(500).json({success: false, data: err});
            } else {
                // Fazer algo
                return res.status(200); //Status 200 - Created. O Front-end é responsável por fazer o resto.
            };
        });
        // Falta um return
    });

}