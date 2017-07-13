//angular.module('myModule', ['chart.js']);
angular.module('novaVida').controller('inicioCtrl', [function() {
    var c = document.getElementById("produtos");
    var ctx = c.getContext("2d");
    var datas = {
        type: 'bar',   // Tipo de gráfico
        data: {
            labels: ["Leite", "Bolacha", "Arroz", "Feijão"],
            datasets: [{
                label: "Produtos mais utilizados (kg)",
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgb(200, 99, 132)',
                data: [50, 40, 20, 10, 0],
            }]
        },
        options: {
            responsive: true,
            legend: {
                display: true,
                position: 'top'
            }
        }
    }
    var chart = new Chart(ctx, datas);

    var c = document.getElementById("receitas");
    var ctx = c.getContext("2d");
    var datas = {
        type: 'line',   // Tipo de gráfico
        data: {
            labels: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL"],
            datasets: [{
                label: "Receita mensal (em milhares)",
                backgroundColor: 'rgba(32, 178, 170, 0.5)',
                borderColor: 'rgb(32, 178, 170)',
                data: [25, 20, 30, 20, 10, 12, 3],
            }]
        },
        options: {
            legend: {
                display: true,
                position: 'top'
            }
        }
    }
    var chart = new Chart(ctx, datas);
    
}])