// Add console.log to check if code is working
console.log('working');

// Add a map object
// Create the map object with a center and zoom level
// let map = L.map('mapid').setView([40.7, -94.5], 4);

let map = L.map('mapid', {
    center: [
        37.6, -122.4
    ],
    zoom: 10
});

// Add a marker
// let marker = L.marker([34.0522, -118.2437]).addTo(map)

// Add a circle with a fixed radius
// let marker = L.circle([34.0522, -118.2437], {
//     radius: 300,
//     color: 'black',
//     fillColor: 'yellow',
//     fillOpacity: '0.25'
// }).addTo(map);

// Add a circle with a radius with a fixed pixel length
// let marker = L.circleMarker([34.0522, -118.2437], {
//     radius: 300,
//     color: 'black',
//     fillColor: '#ffffa1'
// }).addTo(map);

// Get data from cities.js
// let cityData = cities;

// cities.forEach(city => {
//     console.log(city)
//     L.circleMarker(city.location, {
//         radius: city.population / 100000,
//         fillColor: 'orange',
//         fillOpacity: '0.25',
//         color: 'orange',
//         weight: '4'
//     }).bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population: " + city.population.toLocaleString() + "</h3>").addTo(map);
// });

// Add GeoJSON data.
let sanFranAirport =
{
    "type": "FeatureCollection", "features": [{
        "type": "Feature",
        "properties": {
            "id": "3469",
            "name": "San Francisco International Airport",
            "city": "San Francisco",
            "country": "United States",
            "faa": "SFO",
            "icao": "KSFO",
            "alt": "13",
            "tz-offset": "-8",
            "dst": "A",
            "tz": "America/Los_Angeles"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [-122.375, 37.61899948120117]
        }
    }
    ]
};

// Add geoJSON data as a point
// L.geoJSON(sanFranAirport).bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population: " + city.population.toLocaleString() + "</h3>").addTo(map);

// Add geoJSON data as a marker with a popup using the pointToLayer function
// L.geoJSON(sanFranAirport, {
//     pointToLayer: (feature, latlng) => {
//         console.log(feature);
//         return L.marker(latlng)
//             .bindPopup("<h2>" + feature.properties.name + "</h2>")
//     }
// }).addTo(map);

// Add geoJSON data as a marker with a popup using the pointToLayer function
L.geoJSON(sanFranAirport, {
    onEachFeature: (feature, layer) => {
        console.log(layer);
        const underscore = '_';
        const popupTemplate = `<b>Airport Code: </b>${feature.properties.faa}
            </br><b>${underscore.repeat(feature.properties.name.length + 5)}
            </br>
            </br>Airport Name: </b>${feature.properties.name}`;
        layer.bindPopup(popupTemplate);
    }
}).addTo(map);

// let line = [
//     [33.9416, -118.4085],
//     [30.1975, -97.6664],
//     [36.1988, -95.8839],
//     [43.6777, -79.6248],
//     [40.6416, -73.7781]
// ];

// L.polyline(line, {
//     color: 'blue',
//     weight: '2',
//     dashArray: '10',
//     opacity: '0.5',
// }).addTo(map);



// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    // additional map styles (for 'id' below) found here: https://docs.mapbox.com/api/maps/styles/
    id: 'mapbox/outdoors-v11',
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);