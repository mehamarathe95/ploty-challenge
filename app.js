//Drop down selection function 
function InIt() {
    var DropDownSelection = d3.select("#selDataset");
    d3.json("data/samples.json").then((data) => {
        data.names.forEach((name) => {
            DropDownSelection.append("option").text(name);
        });
        demographics(data.names[0]);
        buildPlots(data.names[0]);
    });
};

InIt();

//Option Changed function that will run every time the dropdown selection is changed
function optionChanged(id) {
    demographics(id)
    buildPlots(id)
};

//Function for the demographic table 
function demographics(id) {
    d3.json("data/samples.json").then((data) => {
        var demoInfo = d3.select("#sample-metadata")
        var filtered = data.metadata.filter(object => object.id.toString() == id)[0];
        demoInfo.html("")
        Object.entries(filtered).forEach(([key, value]) => {
            demoInfo.append("h6").text(`${key}: ${value}`);
        });
    });
};

//Function for the plots and charts as well as the filtering whenever needed (dropdown changed)
function buildPlots(id) {
    d3.json("data/samples.json").then((data) => {
        var samples = data.samples;
        var samplesArray = samples.filter(object => object.id == id)[0];
        var metadata = data.metadata;
        var metadataArray = metadata.filter(object => object.id == id)[0];
        var valuesArray = samplesArray.sample_values.slice(0,9).reverse();
        var OTUidsArray = samplesArray.otu_ids.slice(0,10).reverse();
        var OTUlabelsArray = samplesArray.otu_labels.slice(0,10).reverse();
        var ValueBubble = samplesArray.sample_values;
        var IDsBubble = samplesArray.otu_ids;
        var LabelsBubble = samplesArray.otu_labels;

        var OTUs = OTUidsArray.map((num) => "OTU" + num);

        //Horizonal bar chart
        var trace1 = {
            type: "bar",
            orientation: "h",
            x: valuesArray,
            y: OTUs,
            text: OTUlabelsArray,
            marker: {
                color: "#FFA07A"
            }
        };

        var barLayout = {
            title: "Top Ten OTU's in Test Subject's Navel",
            xaxis: {
            title: "Test Subject's Bacterial Count"
            },
            yaxis: {
            title: "Taxonomic Unit #"
            }
        };

        var barChart = [trace1];

        Plotly.newPlot("bar", barChart, barLayout);

        //Bubble chart
        var trace2 = {
            x: IDsBubble,
            y:ValueBubble,
            text: LabelsBubble,
            type: "bubble",
            mode: "markers",
            marker: {
                color: IDsBubble,
                size: ValueBubble
            }
        };

        var bubbleLayout = {
            title: 'OTU Sample size',
            xaxis: {title: 'OTU ID'},
            yaxis: {title: "Bacterial Count of each Sample"}
        };

        var bubbleChart = [trace2];

        Plotly.newPlot("bubble", bubbleChart, bubbleLayout);

        //Guage chart (optional)
        var trace3 = {
            value: metadataArray.wfreq,
            title: {
                text: "Belly Button Washing Frequency <br> Scrubs Per Week",
            },
            type: "indicator",
            mode: "gauge",
            gauge: {
                axis: {range: [0,9]},
                bar: {color: "040404", thickness: 0.325},
                steps: [
                    {range: [0,1], color: "#FFA500"},
                    {range: [1,2], color: "#FF8C00"},
                    {range: [2,3], color: "#FF7F50"},
                    {range: [3,4], color: "#FF6347"},
                    {range: [4,5], color: "#FF4500"},
                    {range: [5,6], color: "#FF0000"},
                    {range: [6,7], color: "#DC143C"},
                    {range: [7,8], color: "#B22222"},
                    {range: [8,9], color: "#8B0000"}
                ]
            }
        };

        var gaugeChart = [trace3];

        Plotly.newPlot("gauge", gaugeChart)

    });
};
