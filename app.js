//1. Use the D3 library to read in `samples.json`.
//2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
//* Use `sample_values` as the values for the bar chart.
//* Use `otu_ids` as the labels for the bar chart.
//* Use `otu_labels` as the hovertext for the chart.
//![bar Chart](Images/hw01.png)

//1. Use the D3 library to read in `samples.json`.
d3.json("../../samples.json", function(data) {
        console.log(data);
    });