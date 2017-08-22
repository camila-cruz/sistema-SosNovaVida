const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/tcc';

module.exports = ( app ) => {
    //READ
    app.get('/acolhidos', (req, res, next) => {
        /*const acolhidos = [{
            nome: 'Yuri',
            data_nasc: new Date(),
            local_nasc: 'SP',
            nome_mae: 'Joice',
            nome_pai: 'Gabriel'
        }];*/

        const acolhidos = [];
        // Get a Postgres client from the connection pool
        pg.connect(connectionString, (err, client, done) => {
            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                return res.status(500).json({success: false, data: err});
            }
            // SQL Query > Select Data
            const query = client.query('SELECT * FROM acolhidos ORDER BY idacolhido ASC;');
            
            // Stream acolhidos back one row at a time
            query.on('row', (row) => {
                acolhidos.push(row);
            });
            // After all data is returned, close connection and return acolhidos
            query.on('end', () => {
                done();
                return res.json(acolhidos);
                res.send(acolhidos).status(200);
            });
        });

        console.log('Recebendo requisição GET em /acolhidos');
        //res.send(acolhidos).status(200);
    })

    app.get('/acolhidos/:id', (req, res) => {
        let id = req.params.id;
        res.render('formPIA');
    });

    //CREATE
    app.post('/acolhidos', (req, res, next) => {
        const results = [];
        // Grab data from http request
        /*const data = {
            text: req.body.text,
            complete: false
        };*/

        const data = req.body;
        console.log("data.nome: " + data.nome);

        // Get a Postgres client from the connection pool
        pg.connect(connectionString, (err, client, done) => {
            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                return res.status(500).json({success: false, data: err});
            }
            // SQL Query > Insert Data
            client.query('INSERT INTO acolhidos(nome, datanasc, dataentrada, cidadenatal, uf, nomemae, maeresp, nomepai, pairesp, nomeresp) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
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
        });
    })

}