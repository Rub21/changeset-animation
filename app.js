var files = [];

function getFileSizeandName(input) {
  var select = $('#uploadTable');
  var arr = []
  for (var i = 0; i < input.files.length; i++) {
    // console.log(input.files[i].name)
    arr.push(input.files[i])
  }

  files = arr.sort(function(a, b) {
    return (parseInt(a.name.split('.')[0]) - parseInt(b.name.split('.')[0]));
  });
  // arr.reverse();
  for (var i = 0; i < files.length; i++) {
    console.log(files[i].name)
  }
}


mapboxgl.accessToken = 'pk.eyJ1IjoicnViZW4iLCJhIjoiYlBrdkpRWSJ9.JgDDxJkvDn3us36aGzR6vg';
var map = new mapboxgl.Map({
  container: 'map',
  zoom: 4,
  center: [0, 0],
  style: 'mapbox://styles/ruben/cje7glisrhb1q2rp7dosrnhri',
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
  file = files[i];
  fr = new FileReader();
  fr.onload = receivedText;
  fr.readAsText(file);

  function receivedText(e) {
    lines = e.target.result;
    var newArr = JSON.parse(lines);
    mapline(i, file.name, newArr)
  }
  // fr.onloadend = function(evt) {
  //   if (evt.target.readyState == FileReader.DONE) {
  i++;
  if (i < files.length) {
    print(i)
  }
  // }
}

$(function() {
  $("#drag").draggable({
    containment: "parent"
  });
});