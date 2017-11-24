//angular.module('myModule', ['chart.js']);
angular.module('novaVida').controller('inicioCtrl', function( graficoEstoque ) {

    const nomeProdutos = [];
    graficoEstoque.data.forEach( produto => nomeProdutos.push( produto.descricao ) );
    const qtdProdutos = [];
    graficoEstoque.data.forEach( produto => qtdProdutos.push( produto.qtd ) );

    var c = document.getElementById("produtos");
    var ctx = c.getContext("2d");
    var datas = {
        type: 'bar',   // Tipo de gráfico
        data: {
            labels: nomeProdutos,
            datasets: [{
                label: "Produtos mais utilizados (saídas)",
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgb(200, 99, 132)',
                data: qtdProdutos,
            }]
        },
        options: {
            responsive: true,
            legend: {
                display: true,
                position: 'top'
            },
            scales: { yAxes: [{ ticks: { beginAtZero:true, callback: ( value ) => { if (value % 1 === 0 ) return value; } } }] }
        }
    }
    var chart = new Chart(ctx, datas);

    var c = document.getElementById("acolhidos");
    var ctx = c.getContext("2d");
    var datas = {
        type: 'line',   // Tipo de gráfico
        data: {
            labels: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL"],
            datasets: [{
                label: "Quantidade de acolhidos ativos (mensal)",
                backgroundColor: 'rgba(32, 178, 170, 0.5)',
                borderColor: 'rgb(32, 178, 170)',
                data: [25, 20, 30, 20, 10, 12, 3],
            }]
        },
        options: {
            responsive: true,
            legend: {
                display: true,
                position: 'top'
            },
            scales: { yAxes: [{ ticks: { beginAtZero:true } }] }
        }
    }
    var chart = new Chart(ctx, datas);
    
})