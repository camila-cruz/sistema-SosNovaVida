module.exports = ( app ) => {
    app.get('/estoque', (req, res) => {
        let produtos = [{
            descricao: 'Arroz',
            qtd: 1,
            doador: { 
                nome: 'Yuri Cabral',    
                preco_entrada: 100
            }
        }]
        console.log('Recebendo consulta em /estoque');
        res.send(produtos).status(200);
    });
}