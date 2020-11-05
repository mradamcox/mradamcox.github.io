// create map and add mapbox
let map = L.map('map',{
    fullscreenControl: true,
    attributionControl: false
}).setView([29.9313, -90.0920], 11);

var credits = L.control.attribution().addTo(map);
credits.addAttribution('© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>');

// make and add basemap layer from mapbox
var mapbox_api_key = "pk.eyJ1IjoibGVnaW9uZ2lzIiwiYSI6ImNqbnc3ODVraDAwMW0za21lOG9oZG9meGcifQ.6_w6aZZf2QezFrGO-VLl8Q"
let latlongpopup = L.popup({'className' : 'latlong-popup'});
map.on("contextmenu", function (event) {
    let latitude = event.latlng.lat.toFixed(4);
    let longitude = event.latlng.lng.toFixed(4);
    let gm = 'http://maps.google.com/maps?z=7&t=k&q=loc:'+latitude+'+'+longitude;
    let gmlink = '<br><a href="'+gm+'" target="_blank">google maps</a>'
    latlongpopup
        .setLatLng(event.latlng)
        .setContent(latitude+', '+longitude+'<br>zoom level: '+map.getZoom()+gmlink)
        .openOn(map);
});

let osmLayer = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}@2x.png', {
      attribution: 'Wikimedia maps beta | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  });
  
  let mapbox_key = "pk.eyJ1IjoibGVnaW9uZ2lzIiwiYSI6ImNqeTBvMzNjazA1NmgzaG5xY2pna3ZpYjQifQ.X1HRPGM4VWhmyh14rz6xcQ"
  let mapbox_aerial = L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token='+mapbox_key,{
    maxNativeZoom:18,
    maxZoom:19,
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
  });

  let legionows = "https://db.legiongis.com/geoserver/ows?"
  let atlasattr = "<a href='https://atlas.ga.lsu.edu'>ATLAS</a>"
  
  let elev_grp = L.tileLayer.wms(legionows, {
    layers: 'nola:nola-elev-grp',
    format: 'image/png',
    transparent: true,
    attribution: atlasattr,
    tiled: true,
    maxZoom:19,
  });
  
  let hs_grp = L.tileLayer.wms(legionows, {
    layers: 'nola:nola-hs-grp',
    format: 'image/png',
    transparent: true,
    attribution: atlasattr,
    tiled: true,
    maxZoom:19,
  });
  
  let relief_grp = L.tileLayer.wms(legionows, {
    layers: 'nola:nola-relief-grp',
    format: 'image/png',
    transparent: true,
    attribution: atlasattr,
    tiled: true,
    maxZoom:19,
  });
  
  var workIcon = L.icon({
      iconUrl: 'https://www.searchpng.com/wp-content/uploads/2019/02/Men-at-work-Icon-PNG-1024x1024.png',
      iconSize: [16, 16],
      iconAnchor: [8, 8],
      popupAnchor: [0, -8]
  });
  
  let SWBworkorders = L.esri.featureLayer({
      url: 'https://services1.arcgis.com/cYAR0YQ3Tr6M4FbT/ArcGIS/rest/services/WO_ScheduledForToday/FeatureServer/0',
      pointToLayer: function (geojson, latlng) {
         return L.marker(latlng, { icon: workIcon });}
  });

  let pumpstation_fs = 'https://services1.arcgis.com/cYAR0YQ3Tr6M4FbT/ArcGIS/rest/services/SWB_PumpStations_NEW_ReadOnlyView/FeatureServer/'
  
  var greenDot = L.icon({
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Green_pog.svg/64px-Green_pog.svg.png',
      iconSize: [10, 10],
      iconAnchor: [5, 5],
      popupAnchor: [0, -8]
  });
  
  var redDot = L.icon({
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Red_pog.svg/64px-Green_pog.svg.png',
      iconSize: [10, 10],
      iconAnchor: [5, 5],
      popupAnchor: [0, -8]
  });
  
  let pumpStations = L.esri.featureLayer({
      url: pumpstation_fs+"0",
     pointToLayer: function (geojson, latlng) {
        console.log(geojson);
        let dot = redDot
         if (geojson.properties.NumPumps == geojson.properties.AvailablePumps) {
            dot = greenDot
         }
         
         return L.marker(latlng, {
                icon: dot
              });
              
              
    }
  });

  let workorderTemplate = `
  <p style="font-size:.8em">
    <strong>W_O_NO:</strong> {W_O_NO}<br>
    <strong>WO_DATE:</strong> {WO_DATE}<br>
    <strong>ASSIGNED_DATE:</strong> {ASSIGNED_DATE}<br>
    <strong>ASSIGN_TO:</strong> {ASSIGN_TO}<br>
    <strong>TRUCK_NUMBER:</strong> {TRUCK_NUMBER}<br>
    <strong>STRUCT_1:</strong> {STRUCT_1}<br>
    <strong>STRUCT_2:</strong> {STRUCT_2}<br>
    <strong>Zone:</strong> {Zone}<br>
    <strong>ADD_:</strong> {ADD_}<br>
    <strong>STREET:</strong> {STREET}<br>
    <strong>CROSS_STREET:</strong> {CROSS_STREET}<br>
    <strong>PROBLEM_CODE:</strong> {PROBLEM_CODE}<br>
    <strong>ACT__CODE:</strong> {ACT__CODE}<br>
    <strong>COMP_BY:</strong> {COMP_BY}<br>
    <strong>ACTION_TAKEN:</strong> {ACTION_TAKEN}<br>
    <strong>STATUS:</strong> {STATUS}<br>
    <strong>COMP__DATE:</strong> {COMP__DATE}<br>
    <strong>PROBLEM_DETAILS:</strong> {PROBLEM_DETAILS}<br>
    <strong>DAILY_STATUS:</strong> {DAILY_STATUS}<br>
    <strong>SYMBOL_TXT:</strong> {SYMBOL_TXT}<br>
    <strong>FOREMAN_CODE:</strong> {FOREMAN_CODE}<br>
    <strong>PROBLEM_DESC:</strong> {PROBLEM_DESC}<br>
    <strong>ACT_TYPE:</strong> {ACT_TYPE}<br>
    <strong>W_O_AGE:</strong> {W_O_AGE}<br>
    <strong>DEPT_CODE:</strong> {DEPT_CODE}<br>
    <strong>WO_TYPE:</strong> {WO_TYPE}<br>
    <strong>LOCATOR:</strong> {LOCATOR}<br>
    <strong>PRIORITY_CODE:</strong> {PRIORITY_CODE}<br>
  </p>`;
    

  SWBworkorders.bindPopup(function (layer){
     return L.Util.template(workorderTemplate, layer.feature.properties)
  });
  
  let pumpStationTemplate = `
  <p style="font-size:.8em">
    <strong>StationName:</strong> {StationName}<br>
    <strong>NumPumps:</strong> {NumPumps}<br>
    <strong>AvailablePumps:</strong> {AvailablePumps}<br>
    <strong>Type:</strong> {Type}<br>
    <strong>ServiceArea:</strong> {ServiceArea}<br>
    <strong>Basin:</strong> {Basin}<br>
    <strong>Address:</strong> {Address}<br>
    <strong>Phone:</strong> {Phone}<br>
    <strong>District:</strong> {District}<br>
    <strong>LocationDescription:</strong> {LocationDescription}<br>
    <strong>Neighborhood:</strong> {Neighborhood}<br>
    <strong>CreationDate:</strong> {CreationDate}<br>
    <strong>Creator:</strong> {Creator}<br>
    <strong>EditDate:</strong> {EditDate}<br>
    <strong>Editor:</strong> {Editor}<br>
  </p>`;
    

  pumpStations.bindPopup(function (layer){
     return L.Util.template(pumpStationTemplate, layer.feature.properties)
  });

  osmLayer.setZIndex(1);
  mapbox_aerial.setZIndex(2);
  elev_grp.setZIndex(3);
  hs_grp.setZIndex(4);
  relief_grp.setZIndex(5)
 
  relief_grp.addTo(map);
  pumpStations.addTo(map);
  
  let baseLayers = {
    "Open Street Map":osmLayer,
    "Aerial Imagery":mapbox_aerial,
  };
  
  let overlayLayers = {
    "elevation":elev_grp,
    "hillshade":hs_grp,
    "composite":relief_grp,
    "pump stations: all pumps available?":pumpStations,
    "S&WB Today's Work Orders":SWBworkorders,
  };
  
  //let c_fullscreen = new L.fullscreen({position:'bottomright'});
  let c_layers = new L.control.layers(baseLayers, overlayLayers,{position:'topright',autoZIndex:false});
  
  map.addLayer(osmLayer);
  map.addControl(c_layers);
  
  getPumpStatus()
  
function getPumpStatus() {
    $.ajax({
        type: "POST",
        url: pumpstation_fs+"1/query?where=PumpStatus+%3D+1&f=pjson",
        dataType: "json",
        success: function (result, status, xhr) {
            console.log(result)
        },
        error: function (xhr, status, error) {
            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
        }
    });
}
