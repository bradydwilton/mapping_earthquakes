// Add console.log to check if code is working
console.log('working');

// Create tile layers
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    // additional map styles (for 'id' below) found here: https://docs.mapbox.com/api/maps/styles/
    id: 'mapbox/satellite-streets-v10',
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

// Create array of basemaps
let baseMaps = {
    Light: light,
    Dark: dark,
    // Street: streets
};

// Create map object
let map = L.map('mapid', {
    center: [
        44, -80
    ],
    zoom: 2,
    layers: [dark]
});

// Add layer control options to map
L.control.layers(baseMaps).addTo(map);


const torontoRoutes = 'https://raw.githubusercontent.com/bradydwilton/mapping_earthquakes/mapping_geojson_linestrings/torontoRoutes.json'

let mapStyle = {
    color: 'lightGreen',
    weight: 2
};

let torontoData = d3.json(torontoRoutes).then(data => {
    console.log(data);
    L.geoJSON(data, {
        style: mapStyle,
        onEachFeature: (feature, layer) => {
            const underscore = '_';
            const popupTemplate = `<h3>Airline: ${feature.properties.airline}</h3>
                                    <h5>${underscore.repeat(40)}</h5>
                                    <h4>Destination: ${feature.properties.dst}</h4>`;
            layer.bindPopup(popupTemplate);
        }
    }).addTo(map);
});

