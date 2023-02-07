// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
  "pk.eyJ1IjoiemVsaWctam9obiIsImEiOiJjbGNwZHdyYzQxczh1M3NtcXhwa2Nhem9xIn0.YpfunhLLiXtLO-X8UKC0pg";

const style_2020 = "mapbox://styles/zelig-john/cldab9nrv004m01s995w52q7d";
const style_2021 = "mapbox://styles/zelig-john/cldabcu6f000w01ofxez2drod";

// Create a map variable for your first month (which will be shown as the default when loading the map)
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: style_2020,
  center: [-0.089932, 51.514441],
  zoom: 14
});

// add some JS to enable the radio button interaction

const layerList = document.getElementById("menu");
const inputs = layerList.getElementsByTagName("input");

//On click the radio button, toggle the style of the map.
for (const input of inputs) {
  input.onclick = (layer) => {
    if (layer.target.id == "style_2020") {
      map.setStyle(style_2020);
    }
    if (layer.target.id == "style_2021") {
      map.setStyle(style_2021);
    }
  };
}