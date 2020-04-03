//Showing the infos on hover
    var info = L.control();

    info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info');
      this.update();
      return this._div;
    };

    info.update = function (props) {

      this._div.innerHTML = '<h4>Dados da cidade: </h4>' + (props ?
        '<b>' + props.nome + '</b><br/><br/>' + 'População: ' + props.populacao.toLocaleString('pt-BR') + '<br/><br/>' + 'PIB: R$ ' + props.pib.toLocaleString('pt-BR') + '<br/><br/>' + 'Região: ' + props.regiao + '<br/><br/>' + 'Valor NF: R$ ' + props.valorNF.toLocaleString('pt-BR') : 'Passe o mouse sobre a cidade');
      };

    info.addTo(map);

    L.geoJSON(geojsonFeature).addTo(map);