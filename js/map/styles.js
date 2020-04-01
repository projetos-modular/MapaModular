//Getting colors
const regioes = colors;

function getColor(regiao){
  for(var prop in regioes){
    return regiao ? regioes[regiao] : "#a7aaab";
  }
};



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