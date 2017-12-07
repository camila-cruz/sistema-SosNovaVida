//angular.module('myModule', ['chart.js']);
//const con = require('../database/db-factory.js');
angular.module('novaVida').controller('inicioCtrl', function( graficoEstoque, graficosAPI ) {

    const nomeProdutos = [];
    graficoEstoque.data.forEach( produto => nomeProdutos.push( produto.descricao ) );
    const qtdProdutos = [];
    graficoEstoque.data.forEach( produto => qtdProdutos.push( produto.qtd ) );
    console.log("estoque: " + graficoEstoque.data);
    console.log("estoque api: " + graficosAPI.getGraficoEstoque().data);

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
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: ( value ) => {
                            if (value % 1 === 0 ) return value;
                        }
                    }
                }]
            }
        }
    }
    console.log("proutos: " + produtos);
    var chart = new Chart(ctx, datas);
//////////////////////////////////////////////////////////////////


    const qtdAcolhidos = [];
    
    var c = document.getElementById("acolhidos");
    var ctx = c.getContext("2d");

    
    var datas = {
        type: 'line',   // Tipo de gráfico
        data: {
            //labels: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"],
            labels: [],
            datasets: [{
                label: "Quantidade de acolhidos ativos (mensal)",
                backgroundColor: 'rgba(32, 178, 170, 0.5)',
                borderColor: 'rgb(32, 178, 170)',
                //data: [25, 20, 30, 20, 10, 12, 3, 8, 30, 6, 19, 12],
                data: qtdAcolhidos,
            }]
        },
        options: {
            responsive: true,
            legend: {
                display: true,
                position: 'top'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    }
    
    //criar um array com escopo local

    //para preencher os labels dos meses no gráfico com o mês atual + os 11 meses anteriores
    var mesAtualNum = new Date().getMonth()+1;  //define o mes atual em numero + 1
    var jota = 0;
    for (let i = 0; i <= 11; i++){  //roda 12 vezes
        if (mesAtualNum == 0){       //faz com que só varie de 0 a 11, pois são os 12 meses
            mesAtualNum = 11;
        }else{
            mesAtualNum--;
        }
        
        let dataString = (mesAtualNum+1).toString() + '-01-2017';    //monta a string de uma data qualquer com o mês da rodada
        let mes = new Date(dataString).toLocaleDateString('pt-br', {month: 'short'}).toUpperCase(); //transforma a string da data no mês reduzido
        datas.data.labels.unshift(mes);    //adiciona o mes da rodada no começo do labels do grafico

        //console.log("acolhido: " + acolhido);
        //graficosAPI.getGraficoAcolhido(jota).then( acolhido => qtdAcolhidos.unshift(acolhido.qtd));
        console.log("retorno acolhidos: " + graficosAPI.getGraficoAcolhido(jota));
        //for (acolhidos.qtd in graficosAPI.getGraficoAcolhido(jota)){ qtdAcolhidos.unshift(acolhidos.qtd);}
        jota++;
        console.log("qtdAcolhidos: " + qtdAcolhidos);

    }
    var chart = new Chart(ctx, datas);
    
})