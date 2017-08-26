module.exports = ( app ) => {
    app.get('/estoque', (req, res) => {
        let produtos = [{
            descricao: 'Arroz',
            tipo: 'Alimento',
            qtd: 1,   
            preco_entrada: 'R$ 100,00'
        }]
        console.log('Recebendo consulta em /estoque');
        res.send(produtos).status(200);
    });
}