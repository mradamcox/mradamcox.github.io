var map = L.map('map').setView([30.6722, -91.2828], 13);

L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png').addTo(map);

var visitorCenter = L.marker([30.6936, -91.2768]).addTo(map);

var boundary = L.polygon([
    [30.6899, -91.2978],
    [30.6970, -91.2813],
    [30.6924, -91.2698],
    [30.6806, -91.2662],
    [30.6705, -91.2686],
    [30.6595, -91.2768],
    [30.6530, -91.2907],
    [30.6664, -91.2923]
]).addTo(map);

var path = L.polyline([
    [30.6949, -91.3021],
    [30.6921, -91.2975],
    [30.6891, -91.2958],
    [30.6850, -91.2930]
]).addTo(map);

boundary.bindPopup('This is the approximate boundary of the siege of Port Hudson.');
visitorCenter.bindPopup('Port Hudson State Historic Site Visitor Center.');
path.bindPopup('Approach of the Louisiana Native Guard.');

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