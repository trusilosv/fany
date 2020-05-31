mapboxgl.accessToken = 'pk.eyJ1IjoidHJ1c2lsb3N2IiwiYSI6ImNrYXF4Mzd4YjA0aDIyd25xeng4eGZvcHAifQ.TtL1ljc-pBBM4D6rtCxdrg';
var map = new mapboxgl.Map({
    container: 'map',
    zoom: 2,
    style: 'mapbox://styles/mapbox/streets-v11'

});

function mapfly(x, y) {
    map.flyTo({
        center: [x, y],
        zoom: 9,
        speed: 0.3,
        essential: true
    });
}