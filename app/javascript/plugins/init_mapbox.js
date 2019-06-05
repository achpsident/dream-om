import mapboxgl from 'mapbox-gl';

const mapElement = document.getElementById('map');

const buildMap = () => {
  mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
  return new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/tinacliu/cjwgi4nmj3pn91cs7td92c9hk'
  });
};

const addMarkersToMap = (map, markers) => {
  markers.forEach((marker) => {
    new mapboxgl.Marker()
      .setLngLat([ marker.lng, marker.lat ])
      .addTo(map);
  });
};

// const loadMapProperly = (map, markers) => {
//   document.querySelector("#pills-map-tab").addEventListener("click", (event) => {
//     console.log("click tab")
//     setTimeout(function() {
//       map.resize();
//       fitMapToMarkers(returnedMap, JSON.parse(document.getElementById("map").dataset.markers));
//     }, 200);
// };


const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, zoom:7, minZoom: 5, maxZoom: 15 });
};

const initMapbox = () => {
  if (mapElement) {
    const map = buildMap();
    const markers = JSON.parse(mapElement.dataset.markers);
    addMarkersToMap(map, markers);
    fitMapToMarkers(map, markers);
    map.addControl(new mapboxgl.NavigationControl());
   //  loadMapProperly(map, markers);
   // $(window).resize(function(){map.resize()});
    // const canvasElement = mapElement.querySelector(".mapboxgl-canvas")
    // mapElement.style.width = "100%";
    // mapElement.style.height = "700px";
    // map.resize();
    return map;
 }
};

export { initMapbox, fitMapToMarkers };
