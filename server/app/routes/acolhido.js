//const pg = require('pg');
const path = require('path');
const con = require('../database/db-factory.js');
//const connectionString = process.env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/tcc';

module.exports = ( app ) => {
    app.get('/acolhidos', (req, res, next) => {
        console.log('Recebendo requisição GET em /acolhidos');
        const acolhidos = [];
        con.query('SELECT * FROM acolhidos ORDER BY idacolhido ASC;', null , function(err, result){
            if (err) {
                console.log(err.message);
                return res.status(500).json({success: false, data: err});
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
    });
/* tirar código chumbado. Apagar
    app.get('/acolhidos/pia/:id', (req, res) => {
        let id = req.params.id;
        console.log("ID: " + id);
        //console.log(req.params);
        const acolhido = {
            id: 14,
            nome: 'José da Silva',
            data_nasc: new Date(),
            local_nasc: 'Suzano - SP',
            nome_mae: 'Maria da Silva',
            nome_pai: 'João da Silva'
            //imagem: "http://animais.culturamix.com/blog/wp-content/gallery/fotos-de-capivara-1/Fotos-Capivara-1.jpeg"
        };
        //res.json(acolhidos[id-1]);
        //res.json(acolhido);
        res.send(acolhido).status(200);
        //res.render('formPIA');
    });
*/ 
    
    app.get('/acolhidos/:id', (req, res) => {
        let id = req.params.id;
        console.log('Recebendo requisição GET em /acolhidos/' + id);
        // Get a Postgres client from the connection pool
        con.query('SELECT * FROM acolhidos WHERE idacolhido = $1;', [id], ( err, results ) => {
            if (err) return res.status(500).send(err);

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
/*
        const results = [];
        // Grab data from http request
        const data = {
            text: req.body.text,
            complete: false
        };

        // Get a Postgres client from the connection pool
        pg.connect(connectionString, (err, client, done) => {
            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                return res.status(500).json({success: false, data: err});
            }
            // SQL Query > Insert Data
            client.query('INSERT INTO acolhidos(nome, data_nasc, data_entrada, local_nasc, uf, nome_mae, maeresp, nome_pai, pairesp, nomeresp) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
            [data.nome, data.dtNasc, data.dtEntr, data.cidNatal, data.uf.nome, data.nomeMae, data.isMaeResp, data.nomePai, data.isPaiResp, data.outroResp]);
            console.log("DATA");
            console.log(data);
            // SQL Query > Select Data
            const query = client.query('SELECT * FROM acolhidos ORDER BY idacolhido ASC');
            // Stream results back one row at a time
            query.on('row', (row) => {
                results.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', () => {
                done();
                return res.json(results);
            });
        });*/
    });

}