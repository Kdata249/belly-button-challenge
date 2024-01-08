url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

function init() {
    d3.json(url).then(function(data) {
        //Populate dropdown menu with the sample ids
        let dropdown = d3.select("#selDataset");
        for(let i=0; i < data.names.length; i++){
            let sample = data.names[i];
            dropdown.append("option").text(sample).property("value", sample);
        }
    
        let initialSample = data.names[0];
        updateBarChart(initialSample);
    })
}

function updateBarChart(selectedSample){
    d3.json(url).then(function(data) {
        //find data from selectedSample
        let selectedData = data.samples.find(sample => sample.id == selectedSample);
        // Create the horizontal bar chart
         // Create the horizontal bar chart
         var barData = [{
            type: "bar",
            x: selectedData.sample_values.slice(0, 10).reverse(),
            y: selectedData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
            text: selectedData.otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        }];

        var barLayout = {
            title: `Top 10 OTUs for Sample ${selectedSample}`,
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU IDs" }
        };

        Plotly.newPlot("bar", barData, barLayout);

        console.log(data)
    })

}

function updateDemoData(selectedSample){
    d3.json(url).then(function(data) {
        let selectedData = data.metadata.find(metadata => metadata.id == selectedSample);
        let demoBox = d3.select('#panel-title');
        demoBox.append('')
    })
}

function optionChanged(selectedSample){
    updateBarChart(selectedSample);
    updateDemoData(selectedSample);
}

init();