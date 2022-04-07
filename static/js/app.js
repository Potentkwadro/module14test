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
        let html = `<h6>${x[0]}:${x[1]}</h5>`
        $("#sample-metadata").append(html);
    });
}