//Getting colors
function getColor(regiao) {
    return regiao == 1301 ? '#29417C' :
           regiao == 1302 ? '#4062bb' :
           regiao == 1303 ? '#59c3c3' :
           regiao == 1304 ? '#DA2128' :
           regiao == 1305 ? '#db5461' :
           regiao == 1306 ? '#ffd9ce' :
           regiao == 1307 ? '#fff500' :
           regiao == 1308 ? '#00923f' :
           regiao == 1309 ? '#da251d' :
           regiao == 1310 ? '#8fd5a6' :
           regiao == 1311 ? '#ecba82' :
           regiao == 1312 ? '#496CC3' :
           regiao == 1313 ? '#EA7278' :
           regiao == 1314 ? '#1D2E59' :
           regiao == 1315 ? '#A71920' :
           regiao == 1316 ? '#d98324' :
           regiao == 1317 ? '#e0ca3c' :
           regiao == 1318 ? '#136f63' :
           regiao == 1319 ? '#007991' :
           regiao == 1320 ? '#131e39' :
           regiao == 1321 ? '#5da9e9' :
           regiao == 1322 ? '#f3b700' : '#a7aaab';
}

//Adding styles
function style(feature) {
  return {
    fillColor: getColor(feature.properties.regiao),
    weight: 0.6,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.7
  };
}

//Adding on the map
L.geoJSON(geojsonFeature, { style: style }).addTo(map);


//Highlight Features
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