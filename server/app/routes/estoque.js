module.exports = ( app ) => {
    app.get('/estoque', (req, res) => {
        let produtos = [
            {
                descricao: 'Arroz',
                qtd: 1,
                doador: { 
                    nome: 'Yuri Cabral'
                },
                preco_entrada: 100
            },
            {
                descricao: "Paçoca Rolha",
                qtd: 5000,
                doador: {
                    nome: "Moquidesia"
                },
                preco_entrada: 20.50
            },
            {
                descricao: "Bolacha Trakinas 400g",
                qtd: 1500,
                doador: {
                    nome: "Moquidesia"
                },
                preco_entrada: 60.75
            }
        ]
        console.log('Recebendo consulta em /estoque');
        res.send(produtos).status(200);
    });
}