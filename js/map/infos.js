//Showing the infos on hover
    var info = L.control();

    info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info');
      this.update();
      return this._div;
    };

    info.update = function (props) {

      this._div.innerHTML = '<h4>Dados da cidade: </h4>' + (props ?
        '<b>' + props.nome + '</b><br/><br/>' + 'Frete: R$ ' + props.frete.toLocaleString('pt-BR') + '<br/><br/>' + 'Custo Transferência: R$ ' + props.custoTransferencia.toLocaleString('pt-BR') + '<br/><br/>' + 'Margem Bruta: R$ ' + props.margemBruta.toLocaleString('pt-BR') + '<br/><br/>' + 'Percentual Margem Bruta: ' + props.margemBrutaPerc + '%' + '<br/><br/>' + 'Valor NF: R$ ' + props.valorNF.toLocaleString('pt-BR') + '<br/><br/>' + 'Parceiro: ' + props.parceiro + '<br/><br/>' + 'Região: ' + props.regiao + '<br/><br/>' + 'Unidade: ' + props.unidade + props.regiao + '<br/><br/>' + 'Peso: ' + props.peso.toLocaleString('pt-BR') + ' Kg' + '<br/><br/>' + 'Cubagem: ' + props.cubagem.toLocaleString('pt-BR') + '<br/><br/>' + 'PIB: R$ ' + props.pib.toLocaleString('pt-BR') + '<br/><br/>' + 'PIB per Capita: R$ ' + props.pibPerCapita.toLocaleString('pt-BR') + '<br/><br/>' + 'População: ' + props.populacao.toLocaleString('pt-BR') + '<br/><br/>'+ 'ID: ' + props.id : 'Passe o mouse sobre a cidade');
      };

    info.addTo(map);

    L.geoJSON(geojsonFeature).addTo(map);