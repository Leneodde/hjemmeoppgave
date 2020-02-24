var data;
var val = 20;

getData(val);

function getData(val){
    const url = 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100';
    
    var request = new XMLHttpRequest()
    
    request.open('GET', url, true)
    request.onload = function() {
      // Begin accessing JSON data here
      data = JSON.parse(this.response)
    
    createTable(val);
    }
    request.send()
}

function createTable(val){
    sessionStorage.setItem("val", val);
    var text = "<tr><th>Id</th><th>Name</th><th>Owner Id</th><th>Type</th></tr>";

    for(i = val - 20; i < val; i++){
        text += "<tr>"; 
        
        text += "<td>" + data.items[i].id + "</td>";
        text += "<td>" + data.items[i].name + "</td>";
        text += "<td>" + data.items[i].owner.id + "</td>";
        text += "<td>" + data.items[i].owner.type + "</td>";

        text += "<tr>";
    }
    document.getElementById('table').innerHTML  = text;
}

function pagingForward(){
    val = parseInt( 20, sessionStorage.getItem("val"));
    val = (val > 200) ? 200 : val;
    createTable(val);
}

function pagingBack(){
    val = sessionStorage.getItem("val") - 20;
    val = (val < 20) ? 20 : val;
    createTable(val);
}

