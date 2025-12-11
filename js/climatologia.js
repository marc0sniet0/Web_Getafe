function cargaGraficoLinea() {

    // Meses del año
    var meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // Porcentaje aproximado de lluvia mensual en Getafe
    // (Distribución típica: más lluvia en otoño/primavera, menos en verano)
    var lluvia = [12, 10, 9, 11, 8, 4, 2, 3, 7, 14, 12, 8];

    var datos = {
        labels: meses,
        datasets: [{
            label: "Porcentaje de lluvia mensual en Getafe (%)",
            backgroundColor: "#0040DC",
            borderColor: "#0040DC",
            fill: true,
            tension: 0.3,
            data: lluvia
        }],
    };

    var config = {
        type: "line",
        data: datos,
        options: {
            scales: {
                x: {
                    border: { color: "black", width: 2 }
                },
                y: {
                    min: 0,
                    max: 20,
                    title: { display: true, text: "Porcentaje (%)" },
                    border: { color: "black", width: 2 }
                }
            }
        }
    };

    var grafico = $("#linea")[0].getContext("2d");
    new Chart(grafico, config);
}

$(document).ready(function () {
    cargaGraficoLinea();
});

