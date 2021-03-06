
    var series = [
      ["AUS",57],["CAN",90],["KEN",50],["USA",93],["UKR",34],["GRC",74],
      ["MEX",80],["GBR",51]]
    var dataset = {};

    var onlyValues = series.map(function(obj){return obj[1]});
    var minValue = Math.min.apply(null, onlyValues), maxValue = Math.max.apply(null, onlyValues);

    var palletteScale = d3.scale.linear().domain([minValue,maxValue]).range(["#4eff0e","#ff2a04"])

    series.forEach(function(item){
      var iso = item[0], value = item[1];
      dataset[iso] = {numberOfThings:value, fillColor: palletteScale(value)}
    })
    var map = new Datamap({
      element: document.getElementById('container'),
      projection: 'mercator',
      fills: { defaultFill: '#F5F5F5'},
      data: dataset,
      geographyConfig: {
        borderColor: '#DEDEDE',
        highlightBorderWidth: 2,
        highlightFillColor: function(geo){
          return geo['fillColor']||'#F5F5F5';
        },
        highlightBorderColor: '#B7B7B7',
        popupTemplate: function(geo,data){
          console.log(geo)
          return ['<div class="hoverinfo">',
            '<strong>',geo.properties.name,'</strong>',
            '<br>Cost: <strong>$',data.numberOfThings, ',000</strong>',
           '</div>'].join('');
        }
      }
     });