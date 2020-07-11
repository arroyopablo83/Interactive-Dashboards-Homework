// Función prinicpal cuando e usuario ingresa a la página
d3.json("../data.json").then(function (data) {

    rellenoDropdown(data["names"])

    // Variables para la grafica de barras
    let metaData = data["metadata"][0]
    let x_bar = data["samples"][0]["otu_ids"];
    let y_bar = data["samples"][0]["sample_values"];
    let text_data = data["samples"][0]["otu_labels"];
    graficas(x_bar, y_bar, text_data, metaData)
});

// Asignando los codigos del dropdown Menu
function rellenoDropdown(names) {
    let selectTag = d3.select("#selDataset")
    let opciones = selectTag.selectAll("option").data(names)
    opciones.enter().append("option").attr("value", function (d) {
        return d
    }).text(function (d) {
        return d
    })
}


// Sacando la informacion para las graficas
function graficas(x_bar, y_bar, text_bar, metaData) {
    let barrasLugar = d3.select("#sample-metadata")
    // Para borrar todo lo que habia antes
    barrasLugar.html("")

    Object.entries(metaData).forEach(([key, value]) => {
        barrasLugar.append("p").text(`${key}: ${value}`);
    });

    // Crear Grafico de Barras!
    var trace = {
        x: y_bar.slice(0, 10).sort(function (a, b) {
            return a - b
        }),
        y: x_bar.map(d => `OTU ${d}`),
        text: text_bar,
        type: 'bar',
        orientation: 'h'
    };

    let data_bar = [trace]

    Plotly.newPlot("bar", data_bar)

    let trace_bubbles = {
        x: x_bar,
        y: y_bar,
        text: text_bar,
        mode: "markers",
        marker: {
            size: y_bar,
            color: x_bar
        }
    }
    let data_bubbles = [trace_bubbles]
    Plotly.newPlot("bubble", data_bubbles)

    // Grafica Dificil!
    var data = [{
            type: "indicator",
            mode: "gauge+number",
            value: metaData["wfreq"],
            title: {
                text: "Belly Button Washing Frequency",
                font: {
                    size: 30
                }
            },

            gauge: {
                axis: {
                    range: [
                        null, 9
                    ],
                    tickwidth: 1,
                    tickcolor: "darkblue"
                },
                bar: {
                    color: "darkblue"
                },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                    {
                        range: [
                            0, 1
                        ],
                        color: "red"
                    },
                    {
                        range: [
                            1, 2
                        ],
                        color: "red"
                    },
                    {
                        range: [
                            2, 3
                        ],
                        color: "yellow"
                    },
                    {
                        range: [
                            3, 4
                        ],
                        color: "yellow"
                    }, {
                        range: [
                            4, 5
                        ],
                        color: "yellow"
                    }, {
                        range: [
                            5, 6
                        ],
                        color: "yellow"
                    }, {
                        range: [
                            6, 7
                        ],
                        color: "yellow"
                    }, {
                        range: [
                            7, 8
                        ],
                        color: "green"
                    }, {
                        range: [
                            8, 9
                        ],
                        color: "green"
                    },
                ],


                threshold: {
                    line: {
                        color: "red",
                        width: 4
                    },
                    thickness: 0.75,
                    value: 7
                }
            }
        }];

    var layout = {
        width: 500,
        height: 400,
        margin: {
            t: 25,
            r: 25,
            l: 25,
            b: 25
        },
        paper_bgcolor: "lavender",
        font: {
            color: "darkblue",
            family: "Arial"
        }
    };

    Plotly.newPlot('graficadificil', data, layout);


}

// Indepenediente a todas

function optionChanged(nuevoValor) {

    d3.json("../data.json").then(function (data) {

        let sampleEjemplo = data["samples"].filter(function (sample) {
            return sample.id == nuevoValor
        })
        let metadataEjemplo = data["metadata"].filter(function (metadata) {
            return metadata.id == nuevoValor
        })

        // Variables para la grafica de barras

        let x_bar = sampleEjemplo[0]["otu_ids"];
        let y_bar = sampleEjemplo[0]["sample_values"];
        let text_data = sampleEjemplo[0]["otu_labels"];

        graficas(x_bar, y_bar, text_data, metadataEjemplo[0])
    });
}
