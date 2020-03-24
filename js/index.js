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

    var geojsonFeature = dataModular;

    //Mostrando as informações da cidade no hover
    var info = L.control();

    info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info');
      this.update();
      return this._div;
    };

    info.update = function (props) {
      this._div.innerHTML = '<h4>Dados da cidade: </h4>' + (props ?
        '<b>' + props.name + '</b><br/><br/>' + 'População: ' + props.populacao + '<br/><br/>' + 'PIB: ' + props.pib : 'Passe o mouse sobre a cidade');
    };

    info.addTo(map);

    L.geoJSON(geojsonFeature).addTo(map);

    //Adicionando estilos no mapa
    function getColor(regiao) {
      switch (regiao) {
        case 1:
          return "#29417c";

        case 2:
          return "#da2128";
        
        case 3:
          return "#b88b1a";
        
        case 4:
          return "#196b42";
        
        case 5:
          return "#bf77a7";

        default:
          return "#a7aaab";
      }
    }

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [1, 2, 3, 4, 5],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML += '<i style="background:' + getColor(grades[i]) + '"></i> ' +
      grades[i] + (grades[i] ? ' ' + '<br>' : '+');
    }

    return div;
  };

legend.addTo(map);

    function style(feature) {
      return {
        fillColor: getColor(feature.properties.regiao),
        weight: 0.6,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
      };
    }

    L.geoJSON(geojsonFeature, { style: style }).addTo(map);

    function highlightFeature(e) {
      var layer = e.target;

      layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }

      info.update(layer.feature.properties);
    }

    var geojson;

    function resetHighlight(e) {
      geojson.resetStyle(e.target);
    }

    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
      });
    }

    geojson = L.geoJSON(geojsonFeature, {
      style: style,
      onEachFeature: onEachFeature
    }).addTo(map);

    //Criando as rotas
    var control = L.Routing.control({
      router: L.Routing.mapbox('pk.eyJ1IjoiY2FtaWxhLWJlY2tlciIsImEiOiJjazgzM3g0dXIwMnMxM2ZtdXI3dHU2YnQ2In0.TTG5wZKNZ-sy2z39YocSyA', {language: 'pt-BR'}),
      formatter: new L.Routing.Formatter({
      language: 'pt-BR'}),
      routeWhileDragging: true
    }).addTo(map);

    function createButton(label, container) {
      var btn = L.DomUtil.create('button', '', container);
      btn.setAttribute('type', 'button');
      btn.innerHTML = label;
      return btn;
    }

    map.on('click', function (e) {
      var container = L.DomUtil.create('div'),
        startBtn = createButton('Inicie desse local', container),
        destBtn = createButton('Vá até esse local', container);

      L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);

      L.DomEvent.on(startBtn, 'click', function () {
        control.spliceWaypoints(0, 1, e.latlng);
        map.closePopup();
      });

      L.DomEvent.on(destBtn, 'click', function () {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        map.closePopup();
      });
    });

