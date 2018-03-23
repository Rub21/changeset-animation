var arr = []

function getFileSizeandName(input) {
  var select = $('#uploadTable');
  for (var i = 0; i < input.files.length; i++) {
    console.log(input.files[i].name)
    arr.push(input.files[i])
  }
  arr = arr.sort(function(a, b) {
    return parseInt(a.name.split('.')[0]) > parseInt(b.name.split('.')[0]);
  });
  // arr.reverse();
}

mapboxgl.accessToken = 'pk.eyJ1IjoicnViZW4iLCJhIjoiYlBrdkpRWSJ9.JgDDxJkvDn3us36aGzR6vg';
var map = new mapboxgl.Map({
  container: 'map',
  zoom: 4,
  center: [0, 0],
  style: 'mapbox://styles/mapbox/basic-v9',
  hash: false
});

$("a").click(function(event) {
  print(0);
});

function mapline(num, id, geojson) {
  if (geojson.features.length > 0) {
    $('#date').text(geojson.features[0].properties.timestamp.split('T')[0]);
    $('#changeset').text(id.split('.')[0]);
    map.addLayer({
      "id": "route" + id,
      "type": "line",
      "source": {
        "type": "geojson",
        "data": geojson
      },
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#e5e43d",
        "line-width": 1
      }
    });
  }
}

function print(i) {
  var input, file, fr;
  arr[i]
  file = arr[i];
  fr = new FileReader();
  fr.onload = receivedText;
  fr.readAsText(file);

  function receivedText(e) {
    lines = e.target.result;
    var newArr = JSON.parse(lines);
    mapline(i, file.name, newArr)
  }
  i++;
  if (i < arr.length) {
    print(i)
  }
}

$(function() {
  $("#drag").draggable({
    containment: "parent"
  });
  $('.ui-widget-content').height($(window).height());
});


var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
  var layerId = layer.target.id;
  map.setStyle('mapbox://styles/' + layerId);
}

for (var i = 0; i < inputs.length; i++) {
  inputs[i].onclick = switchLayer;
}