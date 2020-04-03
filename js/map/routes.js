//Creating routes
var apiToken =
  'pk.eyJ1IjoiY2FtaWxhLWJlY2tlciIsImEiOiJjazgzM3g0dXIwMnMxM2ZtdXI3dHU2YnQ2In0.TTG5wZKNZ-sy2z39YocSyA';

function button(label, container) {
  var btn = L.DomUtil.create('button', '', container);
  btn.setAttribute('type', 'button');
  btn.innerHTML = label;
  return btn;
}

function paragraph(label, container) {
  var info = L.DomUtil.create('p', '', container);
  info.innerHTML = label;
  info.setAttribute('class', 'info-route');
  return info;
}

function selectRoutes(container) {
  var rotas = infoRotas.rotasCanoasRS;
  var select = L.DomUtil.create('select', '', container);
  select.setAttribute('class', 'spacing');
  var option = L.DomUtil.create('option');
  select.appendChild(option);
  rotas.forEach(item => {
    var rota = item.rota;
    var prazo = item.pe;
    option = new Option(rota, rota.toLocaleLowerCase());
    select.options[select.options.length] = option;

    select.addEventListener('change', () => {
      var infoPrazo = document.querySelector('#prazo');
      var valor = select.options[select.selectedIndex].text;
      for (var i = valor; i == rota; i++) {
        infoPrazo.setAttribute('class', 'gap');
        infoPrazo.innerHTML = `O prazo de entrega para a rota: ${valor} é: ${prazo}`;
      }
    });
  });
}

var control = L.Routing.control({
  router: L.routing.mapbox(apiToken, { language: 'pt-BR' }),
  routeWhileDragging: true,
  plan: new (L.Routing.Plan.extend({
    createGeocoders: function() {
      var container = L.Routing.Plan.prototype.createGeocoders.call(this),
        reverseButton = button('&#8593;&#8595;', container);
      infoEntrega = paragraph('Selecione a Rota:', container);
      prazoEntrega = selectRoutes(container);

      L.DomEvent.on(
        reverseButton,
        'click',
        function() {
          var waypoints = this.getWaypoints();
          this.setWaypoints(waypoints.reverse());
        },
        this
      );

      return container;
    }
  }))([L.latLng(-20), L.latLng(-55)], {
    geocoder: L.Control.Geocoder.mapbox(apiToken),
    routeWhileDragging: true
  })
})
  .on('routingerror', function(e) {
    try {
      map.getCenter();
    } catch (e) {
      map.fitBounds(
        L.latLngBounds(
          control.getWaypoints().map(function(wp) {
            return wp.latLng;
          })
        )
      );
    }

    handleError(e);
  })
  .addTo(map);

map.on('click', function(e) {
  var container = L.DomUtil.create('div'),
    startBtn = button('Inicie desse local', container),
    destBtn = button('Vá até esse local', container);

  L.DomEvent.on(startBtn, 'click', function() {
    control.spliceWaypoints(0, 1, e.latlng);
    map.closePopup();
  });

  L.DomEvent.on(destBtn, 'click', function() {
    control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
    map.closePopup();
  });

  L.popup()
    .setContent(container)
    .setLatLng(e.latlng)
    .openOn(map);
});

(function() {
  'use strict';

  L.Routing.routeToGeoJson = function(route) {
    var wpNames = [],
      wpCoordinates = [],
      i,
      wp,
      latLng;

    for (i = 0; i < route.waypoints.length; i++) {
      wp = route.waypoints[i];
      latLng = L.latLng(wp.latLng);
      wpNames.push(wp.name);
      wpCoordinates.push([latLng.lng, latLng.lat]);
    }

    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            id: 'waypoints',
            names: wpNames
          },
          geometry: {
            type: 'MultiPoint',
            coordinates: wpCoordinates
          }
        },
        {
          type: 'Feature',
          properties: {
            id: 'line'
          },
          geometry: L.Routing.routeToLineString(route)
        }
      ]
    };
  };

  L.Routing.routeToLineString = function(route) {
    var lineCoordinates = [],
      i,
      latLng;

    for (i = 0; i < route.coordinates.length; i++) {
      latLng = L.latLng(route.coordinates[i]);
      lineCoordinates.push([latLng.lng, latLng.lat]);
    }

    return {
      type: 'LineString',
      coordinates: lineCoordinates
    };
  };
})();

L.Routing.errorControl(control).addTo(map);
