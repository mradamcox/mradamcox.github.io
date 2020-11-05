$( document ).ready(function() {
    
    // ~~~~~~~~~~ map instantiation ~~~~~~~~~~~~~~~~~~~~ //
    var map = L.map('map',{"maxZoom":20}).setView([29.948960, -90.088018], 13);

    // ~~~~~~~~~~ define all layers ~~~~~~~~~~~~~~~~~~~~ //
    var legionows = "https://db.legiongis.com/geoserver/ows?";
    var mapbox_api_key = "pk.eyJ1IjoibGVnaW9uZ2lzIiwiYSI6ImNpdzg1ZXVvbjAxa2IydG1zcm5kcnZ5NXIifQ.dTfsQ7s5nQv59mHKcNPi_w"

    var osm_attr = "&copy; OpenStreetMap contributors"
    var outdoors = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token='+mapbox_api_key,{maxNativeZoom:18,maxZoom:20,attribution: osm_attr})
    var mapbox_osm = L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token='+mapbox_api_key,{maxNativeZoom:18,maxZoom:20,attribution: osm_attr});

    mapLink = '<a href="http://www.esri.com/">Esri</a>';
    // wholink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
    var esri_aerial = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; '+mapLink,
        maxNativeZoom:19,
        maxZoom: 20,
    });

    var topo = L.esri.tiledMapLayer({
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer'
    });

    var sanborn_general_attr = '<a href="https://en.wikipedia.org/wiki/Sanborn_Maps">Sanborn Map Co.</a>';
    
    var v1_index_L = L.tileLayer.wms(legionows, {
        layers: 'sanborn_no:1885-v1-index-L',
        format: 'image/png',
        transparent: true,
        attribution: sanborn_general_attr,
        tiled: true,
        maxZoom:20,
    });
    var v1_index_R = L.tileLayer.wms(legionows, {
        layers: 'sanborn_no:1885-v1-index-R',
        format: 'image/png',
        transparent: true,
        attribution: sanborn_general_attr,
        tiled: true,
        maxZoom:20,
    });
    
    v1_layer = L.layerGroup([v1_index_L, v1_index_R])
    
    var v2_index_L = L.tileLayer.wms(legionows, {
        layers: 'sanborn_no:1885-v2-index-L',
        format: 'image/png',
        transparent: true,
        attribution: sanborn_general_attr,
        tiled: true,
        maxZoom:20,
    });
    var v2_index_R = L.tileLayer.wms(legionows, {
        layers: 'sanborn_no:1885-v2-index-R',
        format: 'image/png',
        transparent: true,
        attribution: sanborn_general_attr,
        tiled: true,
        maxZoom:20,
    });
    var v2_index_Algiers = L.tileLayer.wms(legionows, {
        layers: 'sanborn_no:1885-v2-index-Algiers',
        format: 'image/png',
        transparent: true,
        attribution: sanborn_general_attr,
        tiled: true,
        maxZoom:20,
    });
    
    v2_layer = L.layerGroup([v2_index_L, v2_index_R,v2_index_Algiers])
    
    var p30_color = L.tileLayer.wms(legionows, {
        layers: 'sanborn_no:1885-p30-color',
        format: 'image/png',
        transparent: true,
        attribution: sanborn_general_attr,
        tiled: true,
        maxZoom:20,
    });
    
    var p31_color = L.tileLayer.wms(legionows, {
        layers: 'sanborn_no:1885-p31-color',
        format: 'image/png',
        transparent: true,
        attribution: sanborn_general_attr,
        tiled: true,
        maxZoom:20,
    });
    
    var all_1885_color = L.layerGroup([p30_color,p31_color]);
    
    var p31_trans = L.tileLayer.wms(legionows, {
        layers: 'sanborn_no:1885-p31-bw',
        format: 'image/png',
        transparent: true,
        attribution: sanborn_general_attr,
        tiled: true,
        maxZoom:20,
    });
    
    var all_1885_trans = L.layerGroup([p31_trans]);
    
    map.addLayer(outdoors);
    
    var baseLayers = {
        "Open Street Map":outdoors,
        "Aerial Imagery":esri_aerial,
        "USGS":topo,
    };
    
    var overlayLayers = {
        "1885, v1 Index":v1_layer,
        "1885, v2 Index":v2_layer,
        "1885, color":all_1885_color,
        "1885, transparent":all_1885_trans,
    }
    
    
    outdoors.setZIndex(1);
    esri_aerial.setZIndex(2);
    v2_layer.setZIndex(3);
    v1_layer.setZIndex(5);
    all_1885_trans.setZIndex(10);
    all_1885_color.setZIndex(11);
    
    var c_layers = new L.control.layers(baseLayers,overlayLayers,{position:'topright',autoZIndex:false});
    map.addControl(c_layers);
    
    var c_pos = new L.Control.Gps({autoCenter:false,setView:true})
    map.addControl(c_pos);
    
    // map.locate({setView: true, maxZoom: 16});

    // function onLocationFound(e) {
        // var radius = e.accuracy / 2;

        // L.marker(e.latlng).addTo(map)
            // .bindPopup("You are within " + radius + " meters from this point").openPopup();

        // L.circle(e.latlng, radius).addTo(map);
    // }

    // map.on('locationfound', onLocationFound);

    // function onLocationError(e) {
        // alert(e.message);
    // }

    // map.on('locationerror', onLocationError);
    
    // new GPSControl({
        // track: true,
        // activeCallback: active => {
          // msg.innerHTML += 'GPS tracking is active ? ' + active + '<br/>';
        // },
        // successCallback: latlng => {
          // msg.innerHTML += 'GPS tracking detected a position change : ' + latlng + '<br/>';
          // map.setView(latlng);
        // },
        // errorCallback: error => {
          // msg.innerHTML += 'GPS tracking failed : ' + error.message + '<br/>';
        // }
    // }).addTo(map);
    
    
    
});
