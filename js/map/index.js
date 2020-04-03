    const map = L.map('map').setView([-20, -55], 4);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2FtaWxhLWJlY2tlciIsImEiOiJjazgzM3g0dXIwMnMxM2ZtdXI3dHU2YnQ2In0.TTG5wZKNZ-sy2z39YocSyA', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'camila-becker/ck8656kyf0t4k1intu4peoqfq',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(map);

    var geojsonFeature = mapaModular;

  




