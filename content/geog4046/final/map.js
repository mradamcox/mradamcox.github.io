// var map = L.map('map').setView([29.9581, -90.0632], 17);

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

var styles = {
  'Point': new ol.style.Style({
    image: new ol.style.Circle({
      radius: 5,
      fill: null,
      stroke: new ol.style.Stroke({color: 'red', width: 1})
    })
  }),
  'LineString': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'green',
      width: 1
    })
  }),
  'MultiLineString': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'green',
      width: 1
    })
  }),
  'MultiPolygon': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'yellow',
      width: 1
    }),
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 0, 0.1)'
    })
  }),
  'Polygon': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'blue',
      lineDash: [4],
      width: 3
    }),
    fill: new ol.style.Fill({
      color: 'rgba(0, 0, 255, 0.1)'
    })
  }),
  'GeometryCollection': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'magenta',
      width: 2
    }),
    fill: new ol.style.Fill({
      color: 'magenta'
    }),
    image: new ol.style.Circle({
      radius: 10,
      fill: null,
      stroke: new ol.style.Stroke({
        color: 'magenta'
      })
    })
  }),
  'Circle': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'red',
      width: 2
    }),
    fill: new ol.style.Fill({
      color: 'rgba(255,0,0,0.2)'
    })
  })
};

var styleFunction = function(feature) {
  return styles[feature.getGeometry().getType()];
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

var simplePoly = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'blue',
    lineDash: [4],
    width: 3
  }),
  fill: new ol.style.Fill({
    color: 'rgba(0, 0, 255, 0.1)'
  })
})

var interactions = ol.interaction.defaults({altShiftDragRotate:false, pinchRotate:false});

var buildingsGeoJSONLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: "buildings.geojson",
      format: new ol.format.GeoJSON()
    }),
    style: simplePoly
});

var stamenWatercolor = new ol.layer.Tile({
  source: new ol.source.Stamen({
    layer: 'watercolor'
  })
})

var stamenLabels = new ol.layer.Tile({
  source: new ol.source.Stamen({
    layer: 'terrain-labels'
  })
})

var mapbox_key = "pk.eyJ1IjoibGVnaW9uZ2lzIiwiYSI6ImNpdzg1ZXVvbjAxa2IydG1zcm5kcnZ5NXIifQ.dTfsQ7s5nQv59mHKcNPi_w"

var businessesStyle = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: 'https://api.mapbox.com/styles/v1/legiongis/ck9ybbgh6286y1ip8vh89dutm/tiles/256/{z}/{x}/{y}?access_token=' + mapbox_key
  })
})

var map = new ol.Map({
  interactions: interactions,
  layers: [
    // stamenLayer,
    stamenWatercolor,
    //buildingsLayerTopo,
    businessesStyle,
    buildingsGeoJSONLayer,
    stamenLabels
  ],
  target: 'map',
  view: new ol.View({
    center: ol.proj.transform([-90.0601, 29.961], "EPSG:4326", "EPSG:3857"),
    rotation: Math.PI / 3.44, // this is in radians, so pi = 180 degrees, and pi / 2 = 90 degrees, etc.
    zoom: 16.25
  }),
  renderer: 'web-gl'
});

$(".ol-rotate-reset").hide()

map.on('pointermove', function(event) {
  //source.clear();
  map.forEachFeatureAtPixel(event.pixel, function(feature) {
    const geometry = feature.getGeometry();
    //console.log(feature);
    //source.addFeature(new Feature(fromExtent(geometry.getExtent())));
  }, {
    hitTolerance: 2
  });
});

var buildingData;
$.ajax({
  url: "buildings.geojson",
  success: function(data) {
    buildingData = $.parseJSON(data);
  }
});

function getRelatedBusinesses (licenseNo) {
    var related = [];
    var licenses = licenseNo.split(";");
    buildingData['features'].forEach( function (feature) {
        var lic = feature.properties['BusinessLicenseNumber']
        if (licenses.indexOf(lic) >= 0) {
            related.push(feature.properties['BusinessName'] + " <br><em>&nbsp;&nbsp;" + feature.properties['BusinessAddress'] + "</em>")
        }
    });
    return related
}

map.on('click', function(event) {
  // source.clear();
  map.forEachFeatureAtPixel(event.pixel, function(feature) {
    const geometry = feature.getGeometry();

    var licenseNo = feature.getProperties().BusinessLicenseNumber;
    var relatedNos = feature.getProperties().RelatedLicenses;
    if (relatedNos != null) {
        related = getRelatedBusinesses(relatedNos);
    } else {
        related = ["None"]
    }

    $("#building-name").html(feature.getProperties().BusinessName);
    $("#owner-name").html(feature.getProperties().OwnerName);

    $("#related").html(related.join("<br>"));
    // source.addFeature(new Feature(fromExtent(geometry.getExtent())));
  }, {
    hitTolerance: 2
  });
});
