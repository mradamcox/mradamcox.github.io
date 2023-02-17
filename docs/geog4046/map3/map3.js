var map = L.map('map').setView([29.9581, -90.0632], 17);

var styles = function (feature) {
  var owner = feature.properties.OwnerName;

  var color;
  
  if (owner == null) {
    color = "grey";
  } else if (owner.indexOf("LLC") !== -1) {
    color = "green";
  } else if (owner.indexOf("L.L.C.") !== -1) {
    color = "green";
  } else if (owner.indexOf("L,L,C.") !== -1) {
    color = "green";
  } else if (owner.indexOf("CORP") !== -1) {
    color = "purple";
  } else if (owner.indexOf("INC") !== -1) {
    color = "orange";
  } else { color = "red" }

  return {
    color: color,
    weight: 1,
    fillOpacity: 0.2
  }
};

var popup = function (feature, layer) {
    var name = feature.properties.BusinessName;
    var type = feature.properties.BusinessType;
    var owner = feature.properties.OwnerName;
    if (owner != null) {
        layer.bindPopup(`<h3>${name}</h3><p>Owned by ${owner}<br><small>License: ${type}</small></p>`)
    }
}

var geojsonOpts = {
  style: styles,
  onEachFeature: popup
};

jQuery.getJSON("buildings.geojson", function (data) {
  L.geoJSON(data, geojsonOpts).addTo(map)
})

L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png').addTo(map);



var latlongpopup = L.popup({'className' : 'latlong-popup'});
  map.on("contextmenu", function (event) {
    var latitude = event.latlng.lat.toFixed(4);
    var longitude = event.latlng.lng.toFixed(4);
    var gm = 'http://maps.google.com/maps?z=7&t=k&q=loc:'+latitude+'+'+longitude;
    var gmlink = '<br><a href="'+gm+'" target="_blank">google maps</a>'
    latlongpopup
        .setLatLng(event.latlng)
        .setContent(latitude+', '+longitude+'<br>zoom level: '+map.getZoom()+gmlink)
        .openOn(map);
  });