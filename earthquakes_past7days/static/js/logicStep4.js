// Add console.log to check if code is working
console.log('working');

// Create tile layers
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    // additional map styles (for 'id' below) found here: https://docs.mapbox.com/api/maps/styles/
    id: 'mapbox/streets-v11',
    accessToken: API_KEY
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    // additional map styles (for 'id' below) found here: https://docs.mapbox.com/api/maps/styles/
    id: 'mapbox/dark-v10',
    accessToken: API_KEY
});

let light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    // additional map styles (for 'id' below) found here: https://docs.mapbox.com/api/maps/styles/
    id: 'mapbox/light-v10',
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    // additional map styles (for 'id' below) found here: https://docs.mapbox.com/api/maps/styles/
    id: 'mapbox/satellite-streets-v10',
    accessToken: API_KEY
});

// Create array of basemaps
let baseMaps = {
    // 'Light': light,
    // 'Dark': dark,
    'Street': streets,
    'Satellite': satelliteStreets
};

const earthquakeURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

let mapStyle = {
    color: 'red',
    weight: 1,
    fillColor: 'red'
};

function getRadius(magnitude) {
    if (magnitude < 1.0) {
        return 1
    }
    return magnitude * 4;
}

function getColor(magnitude) {
    if (magnitude > 5) {
        return 'red'
    }
    if (magnitude > 4) {
        return 'orange'
    }
    if (magnitude > 3) {
        return '#ee9c00'
    }
    if (magnitude > 2) {
        return '#eecc00'
    }
    if (magnitude > 1) {
        return '#d4ee00'
    }
    return '#98ee00'
}

function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 0.75,
        fillColor: getColor(feature.properties.mag),
        color: '#000000',
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
}

// let earthquakeArray = [];
var earthquakes = new L.layerGroup();

let earthquakeData = d3.json(earthquakeURL).then(data => {
    console.log(data);
    L.geoJSON(data, {
        style: styleInfo,
        pointToLayer: (feature, latlng) => {
            const popupTemplate = `<b>Magnitude: </b>${feature.properties.mag}<br>
                                    <b>Location: </b>${feature.properties.place}`
            return L.circleMarker(latlng).bindPopup(popupTemplate);
        }
    }).addTo(earthquakes);
});
// console.log(earthquakeArray);

// var earthquakeLayer = L.layerGroup(earthquakeArray);

// Create array of basemaps
let overlays = {
    'Earthquakes': earthquakes
};


// Create map object
let map = L.map('mapid', {
    center: [
        39.5, -98.5
    ],
    zoom: 3,
    layers: [streets, earthquakes]
});

// Add layer control options to map
L.control.layers(baseMaps, overlays).addTo(map);

