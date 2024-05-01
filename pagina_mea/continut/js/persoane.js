function incarcaPersoane() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      afiseazaTabel(this);
    }
  };
  xhttp.open("GET", "resurse/persoane.xml", true);
  xhttp.send();
}

function afiseazaTabel(xml) {
  var xmlDoc = xml.responseXML;
  var table = "<table border='1'>";
  var x = xmlDoc.getElementsByTagName("persoana");
  for (var i = 0; i < x.length; i++) {
    table += "<tr>";
    table +=
      "<td>" +
      x[i].getElementsByTagName("nume")[0].childNodes[0].nodeValue +
      "</td>";
    table +=
      "<td>" +
      x[i].getElementsByTagName("prenume")[0].childNodes[0].nodeValue +
      "</td>";
    table +=
      "<td>" +
      x[i].getElementsByTagName("varsta")[0].childNodes[0].nodeValue +
      "</td>";
    // Mai adaugă coloanele pentru alte informații dorite
    table += "</tr>";
  }
  table += "</table>";
  document.getElementById("continut").innerHTML = table;
}
