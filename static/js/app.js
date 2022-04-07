$(document).ready(function(){
    console.log("Page Loaded");
    dowork();
});

function dowork(){

    var url = "static/data/samples.json";
    requestAjax(url);
}

function requestAjax(url){
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        success: function(data){
            console.log(data);
            createDropdown(data);
            createMetadata(data);
            createBarChart(data);
        },
        error: function(textStatus, errorThrown) {
            console.log("FAILED to get data");
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function requestD3(url) {
    d3.json(url).then(function(data) {
        console.log(data);

        createDropdown(data);
        createMetadata(data);
        createBarChart(data);
    });
}

function createDropdown(data) {
    var names = data.names;
    console.log(names);
    for (let i = 0; i < names.length; i++) {
        let name = names[i];
        let html = `<option>${name}</option>`;
        $("#selDataset").append(html);
    }
}

function createMetadata(data) {
    let id = $("#selDataset").val();
    let info = data.metadata.filter(x => x.id == id)[0];
    console.log(info);
    Object.entries(info).map(function(x) {
        let html = `<h6>${x[0]}:${x[1]}</h6>`
        $("#sample-metadata").append(html);
    });
}


function createBarChart(data) {
    let id = $("#selDataset").val();
    let sample = data.samples.filter(x => x.id == id)[0];

    var trace1 = {
        type: 'bar',
        x: sample.sample_values.slice(0, 10).reverse(),
        y: sample.otu_ids.map(x => `OTU ${x}`).slice(0, 10).reverse(),
        orientation: 'h'
    }

    var data = [trace1];
    var layout = {
        "title":"Bar Chart Placeholder"
    }

    Plotly.newPlot('bar', data, layout);
}
