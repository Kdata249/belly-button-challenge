url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

function init() {
    d3.json(url).then(function(data) {
        //Populate dropdown menu with the sample ids
        let dropdown = d3.select("#selDataset");
        for(let i=0; i < data.names.length; i++){
            let sample = data.names[i];
            dropdown.append("option").text(sample).property("value", sample);
        }
    
        console.log(data)
        
        let initialSample = data.names[0];
        updateBarChart(initialSample);
        updateBubbleChart(initialSample);
        updateDemoData(initialSample);
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
    })

}

function updateBubbleChart(selectedSample) {
    // URL of the JSON file
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

    // Select the div where the bubble chart will be displayed
    let bubbleChartDiv = d3.select('#bubble');
    
    // Clear existing content in the bubble chart div
    bubbleChartDiv.html('');

    // Fetch the data from the URL
    d3.json(url).then(function(data) {
        // Find the sample data for the selected sample
        let selectedSampleData = data.samples.find(sample => sample.id == selectedSample);

        // Create the bubble chart
        var trace = {
            x: selectedSampleData.otu_ids,
            y: selectedSampleData.sample_values,
            text: selectedSampleData.otu_labels,
            mode: 'markers',
            marker: {
                size: selectedSampleData.sample_values,
                color: selectedSampleData.otu_ids,
                colorscale: 'Viridis'
            }
        };

        var layout = {
            title: `Bubble Chart for Sample ${selectedSample}`,
            xaxis: { title: 'OTU IDs' },
            yaxis: { title: 'Sample Values' }
        };

        Plotly.newPlot('bubble', [trace], layout);
    });
}

function updateDemoData(selectedSample) {
    // URL of the JSON file
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

    // Select the panel body to display demographic info
    let demoBox = d3.select('#sample-metadata');

    // Clear existing content in the demo box
    demoBox.html('');

    // Fetch the data from the URL
    d3.json(url).then(function(data) {
        // Find the metadata for the selected sample
        let selectedMetadata = data.metadata.find(metadata => metadata.id == selectedSample);

        // Display demographic info
        Object.entries(selectedMetadata).forEach(([key, value]) => {
            demoBox.append('p').text(`${key}: ${value}`);
        });
    });
}

function optionChanged(selectedSample){
    updateBarChart(selectedSample);
    updateBubbleChart(selectedSample);
    updateDemoData(selectedSample)
}

init();