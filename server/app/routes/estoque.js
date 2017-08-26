const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/tcc';

module.exports = ( app ) => {
    app.get('/estoque', (req, res, next) => {
        /*let produtos = [{
            descricao: 'Arroz',
            tipo: 'Alimento',
            qtd: 1,   
            preco_entrada: 'R$ 100,00'
        }]*/
        const produtos = [];
        pg.connect(connectionString, (err, client, done) => {
            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                return res.status(500).json({success: false, data: err});
            }
            // SQL Query > Select Data
            const query = client.query('SELECT * FROM produtos;');
            
            // Stream acolhidos back one row at a time
            query.on('row', (row) => {
                produtos.push(row);
            });
            // After all data is returned, close connection and return acolhidos
            query.on('end', () => {
                done();
                return res.json(produtos);
                res.send(produtos).status(200);
            });
        });

        console.log('Recebendo consulta em /estoque');
        //res.send(produtos).status(200);
    });
}