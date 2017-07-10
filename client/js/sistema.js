// Adiciona uma animação para baixo quando o drpdown se expande
$('.dropdown').on('show.bs.dropdown', function() {
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
});

// Adiciona uma animação para cima quando o dropdown se retrai
$('.dropdown').on('hide.bs.dropdown', function() {
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
});

/*
$(function() {
    var ctx = document.getElementById("produtos").getContext("2d");
    var chart = new Chart(ctx, {
        type: 'bar',   // Tipo de gráfico
        data: {
            labels: ["Leite", "Arroz", "Feijão"],
            datasets: [{
                label: "Produtos mais utilizados",
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgb(200, 99, 132)',
                data: [40, 20, 10, 0],
            }]
        },
        options: {}
    });
});*/