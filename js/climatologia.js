/**
 * Función para generar el gráfico de barras
 */
function cargaGraficoBarras() {
    // Datos para generar el gráfico, hay que definir las etiquetas y
    // los datasets. Hay que definir un color para cada dataset
    var datos = {
        labels: ["Netflix", "Prime Video", "Movistar+", "Disney+", "HBO Max", "Otras", "NS/NC"],
        datasets: [{
            label: "Plataforma de pago más utilizada 4T 2024",
            backgroundColor: "#D81E5B",
            data: [44.1, 21.4, 16.7, 6.2, 5.3, 5.8, 0.5]
        }],
    };

    // Configuración del gráfico. Debe incluir imprescindiblemente el
    // tipo de gráfico y los datos que hemos definido previamente.
    // Se pueden añadir opciones para personalizar el gráfico
    var config = {
        type: "bar",
        data: datos,
        options: {
            scales: {
                x: {
                    border: {
                        color: "black",
                        width: 2
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    min: 0,
                    max: 50,
                    title: {
                        display: true,
                        text: "Porcentaje de hogares (%)"
                    },
                    border: {
                        color: "black",
                        width: 2
                    }
                }
            }
        }
    };

    // Para crear el gráfico, se busca el elemento canvas por su id
    // y se le pasa la configuración en JSON que hemos definido
    var grafico = $("#barras")[0].getContext("2d");
    new Chart(grafico, config);
}


/**
 * Función para generar el gráfico de tarta
 */
function cargaGraficoTarta() {
    var datos = {
        labels: ["1", "2", "3", "4 o más"],
        datasets: [{
            label: "2024",
            backgroundColor: ["#D81E5B", "#F76C9A", "#F52268", "#C21B53"],
            data: [36.7, 25.4, 16.8, 21.1]
        }]
    };

    var config = {
        type: "pie",
        data: datos,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Número de plataformas para ver contenidos audiovisuales online de pago usadas por los hogares (porcentaje de hogares) 4T 2024"
                }
            }
        }
    };
    var grafico = $("#tarta")[0].getContext("2d");
    new Chart(grafico, config);
}


/**
 * Función para generar el gráfico de línea
 */
function cargaGraficoLinea() {
    var datos = {
        labels: ["2020", "2021", "2022", "2023", "2024"],
        datasets: [{
            label: "Uso de plataformas de pago para ver contenidos audiovisuales online",
            backgroundColor: "#D81E5B",
            data: [49.6, 55.1, 59.2, 62, 63.3]
        }],
    };

    var config = {
        type: "line",
        data: datos,
        options: {
            scales: {
                x: {
                    border: {
                        color: "black",
                        width: 2
                    }
                },
                y: {
                    min: 0,
                    max: 100,
                    title: {
                        display: true,
                        text: "Porcentaje de hogares (%)"
                    },
                    border: {
                        color: "black",
                        width: 2
                    }
                }
            }
        }
    };

    var grafico = $("#linea")[0].getContext("2d");
    new Chart(grafico, config);
}


$(document).ready(function () {
    cargaGraficoBarras();
    cargaGraficoTarta();
    cargaGraficoLinea();
});
