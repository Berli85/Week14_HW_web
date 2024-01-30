let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
let all_data;

d3.json(url).then(function(data) {
  // Get data
  console.log(data);
  all_data = data;

  // Select the dropdown/populate
  let dropdown = d3.select("#selDataset");

  for (let i = 0; i < data.names.length; i++) {
    let name = data.names[i];
    dropdown.append("option").text(name);
  }

  // Grab an individual's data
  let person = data.names[0];
  let person_data = data.samples.filter(row => row.id === person)[0];
  console.log(person_data);

  makeBar(person_data);
  bubbleChart(person_data);
});

// Make bar chart function
function makeBar(person_data) {
  let sampleValues = person_data.sample_values.slice(0, 10).reverse();
  let otuIds = person_data.otu_ids.slice(0, 10).reverse();
  let otuLabels = person_data.otu_labels.slice(0, 10).reverse();

  let trace1 = {
    x: sampleValues,
    y: otuIds.map(id => `OTU ${id}`),
    text: otuLabels,
    type: "bar",
    orientation: "h"
  };

  let data_1 = [trace1];

  let layout = {
    title: "OTUs (top ten)",
    xaxis: { title: "Sample Value" },
    yaxis: { title: "ID" }
  };

  Plotly.newPlot("bar", data_1, layout);
}

function bubbleChart(person_data) {
    let sampleValues = person_data.sample_values;
    let otuIds = person_data.otu_ids;
    let otuLabels = person_data.otu_labels; 

    let trace1 = {
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        marker: {
            size: sampleValues,
            color: otuIds
        }
      };
    
      let data_1 = [trace1];
    
      let layout = {
        title: "OTUs",
        xaxis: { title: "ID" },
        yaxis: { title: "Number of Observations" }
      };
    
      Plotly.newPlot("bubble", data_1, layout);
}

function optionChanged(person) {
  let person_data = all_data.samples.filter(row => row.id === person)[0];

  // Make bar chart
  makeBar(person_data);
  bubbleChart(person_data);
}