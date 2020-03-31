//Creating routes
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
