module.exports = (app) => {
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