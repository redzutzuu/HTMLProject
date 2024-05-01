function schimbaContinut(resursa, jsFisier, jsFunctie) {
  let formatInput = resursa + ".html";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("continut").innerHTML = this.responseText;
      if (jsFisier) {
        var elementScript = document.createElement("script");
        elementScript.onload = function () {
          if (jsFunctie) {
            window[jsFunctie]();
          }
        };
        elementScript.src = jsFisier;
        document.head.appendChild(elementScript);
      } else {
        if (jsFunctie) {
          window[jsFunctie]();
        }
      }
    }
  };

  xhttp.open("GET", formatInput, true);
  xhttp.send();
}

document.addEventListener("DOMContentLoaded", function () {
  schimbaContinut("acasa");
});

function verificaUtilizator() {
  var utilizator = document.getElementById("utilizator").value;
  var parola = document.getElementById("parola").value;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var utilizatori = JSON.parse(this.responseText);
      var gasit = false;
      utilizatori.forEach(function (utilizatorJSON) {
        if (
          utilizatorJSON.utilizator === utilizator &&
          utilizatorJSON.parola === parola
        ) {
          gasit = true;
        }
      });
      if (gasit) {
        document.getElementById("rezultat").innerText =
          "Utilizator și parolă corecte!";
      } else {
        document.getElementById("rezultat").innerText =
          "Utilizator sau parolă incorecte!";
      }
    }
  };
  xhttp.open("GET", "resurse/utilizatori.json", true);
  xhttp.send();
}

function afiseazaInformatii() {
  var infoElement = document.getElementById("info");
  if (infoElement) {
    var currentDate = new Date();
    var currentDateTime = currentDate.toLocaleString();
    var currentURL = window.location.href;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var currentLocation =
          "Latitudine: " + latitude + ", Longitudine: " + longitude;
        var browserName = window.navigator.appName;
        var browserVersion = window.navigator.appVersion;
        var operatingSystem = navigator.platform;
        var infoMessage =
          "<p>Data și ora curentă: " +
          currentDateTime +
          "</p>" +
          "<p>Adresa URL: " +
          currentURL +
          "</p>" +
          "<p>Locația geografică curentă: " +
          currentLocation +
          "</p>" +
          "<p>Numele browser-ului: " +
          browserName +
          "</p>" +
          "<p>Versiunea browser-ului: " +
          browserVersion +
          "</p>" +
          "<p>Sistemul de operare folosit: " +
          operatingSystem +
          "</p>";
        infoElement.innerHTML = infoMessage;
      });
    }
  }
}

function deseneazaCanvas() {
  var canvas = document.getElementById("myCanvas");
  if (canvas) {
    var context = canvas.getContext("2d");
    var draw = false;
    var startX, startY;
    var contur = "#000000";
    var umplere = "#ffffff";

    canvas.addEventListener("mousedown", function (event) {
      if (event.button === 0) {
        draw = true;
        var rect = canvas.getBoundingClientRect();
        startX = event.clientX - rect.left;
        startY = event.clientY - rect.top;
      }
    });

    canvas.addEventListener("mouseup", function (event) {
      if (draw && event.button === 0) {
        var rect = canvas.getBoundingClientRect();
        var endX = event.clientX - rect.left;
        var endY = event.clientY - rect.top;
        var width = endX - startX;
        var height = endY - startY;

        context.beginPath();
        context.rect(startX, startY, width, height);
        context.fillStyle = umplere;
        context.fill();
        context.strokeStyle = contur;
        context.stroke();

        draw = false;
      }
    });

    canvas.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    });

    var conturInput = document.getElementById("contur");
    conturInput.addEventListener("input", function () {
      contur = conturInput.value;
    });

    var umplereInput = document.getElementById("umplere");
    umplereInput.addEventListener("input", function () {
      umplere = umplereInput.value;
    });
  }
}

function inserareTabel() {
  function inserareLinie() {
    var tabel = document.getElementById("tabel");
    var pozitie = document.getElementById("pozitie").value;
    var culoare = document.getElementById("culoare").value;

    var rand = tabel.insertRow(pozitie);
    var coloane = tabel.rows[0].cells.length;

    for (var i = 0; i < coloane; i++) {
      var celula = rand.insertCell(i);
      celula.style.backgroundColor = culoare;
      celula.innerHTML = "Nou";
    }
  }

  function inserareColoana() {
    var tabel = document.getElementById("tabel");
    var pozitie = document.getElementById("pozitie").value;
    var culoare = document.getElementById("culoare").value;

    var randuri = tabel.rows.length;

    for (var i = 0; i < randuri; i++) {
      var celula = tabel.rows[i].insertCell(pozitie);
      celula.style.backgroundColor = culoare;
      celula.innerHTML = "Nou";
    }
  }

  var inserareLinieBtn = document.getElementById("inserareLinieBtn");
  if (inserareLinieBtn) {
    inserareLinieBtn.addEventListener("click", inserareLinie);
  }

  var inserareColoanaBtn = document.getElementById("inserareColoanaBtn");
  if (inserareColoanaBtn) {
    inserareColoanaBtn.addEventListener("click", inserareColoana);
  }
}

function initializeazaPagina() {
  afiseazaInformatii();
  deseneazaCanvas();
  inserareTabel();
}
