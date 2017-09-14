const pg = require('pg');
const path = require('path');
const conn = require('../database/db-factory');
//const connectionString = process.env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/tcc';

module.exports = ( app ) => {

    app.get('/estoque', (req, res, next) => {
        console.log('Recebendo requisição GET em /estoque');
        
        const produtos = [];
        conn.query('SELECT * FROM produtos', null, (err, result) => {
            if (err) return 'Ocorreu um erro: ' + err;
            let linhas = result.rows[0];
            
            produtos.push(linhas);

            return res.json(produtos);
            res.send(produtos).status(200);
        });
    });
    /*
    app.get('/estoque', (req, res, next) => {
        /*let produtos = [{
            descricao: 'Arroz',
            tipo: 'Alimento',
            qtd: 1,   
            preco_entrada: 'R$ 100,00'
        }]
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
    });*/

    app.get('/estoque/site', (req, res) => {

        /* 
            Aqui deve ser tratada a requisição que o site solicita pra verificar como está o estoque
            par a partir daqui definir qual a prioridade de produto, que colocará em primeiro lugar.
        */

    });

    app.post('/estoque', (req, res) => {
        /*
            Para a integração com o site institucional funcionar da melhor maneira
            precisamos criar uma tabela de movimentações do estoque, tanto entrada quanto saída
            Sempre que for alterado o estoque, será gerado um registro de movimentação nesta tabela

            Dessa forma, a simone não precisa inserir "prioridade" do produto, pois o site pode
            se basear nas movimentações de saída para determinar qual produto é mais imporante
            
            select qtd,produto from movimentacao where tipo="S" group by produto order by qtd desc;
            Essa query pode ser feita
        */
        console.log('Recebendo POST em /estoque');

        // modelar código desrito acíma
    });

}