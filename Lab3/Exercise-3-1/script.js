// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
  "pk.eyJ1IjoiemVsaWctam9obiIsImEiOiJjbGNwZHdyYzQxczh1M3NtcXhwa2Nhem9xIn0.YpfunhLLiXtLO-X8UKC0pg";

//Before map
const beforeMap = new mapboxgl.Map({
  container: "before",
  style: "mapbox://styles/zelig-john/cldab9nrv004m01s995w52q7d",
  center: [-0.089932, 51.514441],
  zoom: 14
});

//After map
const afterMap = new mapboxgl.Map({
  container: "after",
  style: "mapbox://styles/zelig-john/cldabcu6f000w01ofxez2drod",
  center: [-0.089932, 51.514441],
  zoom: 14
});

const container = "#comparison-container";
const map = new mapboxgl.Compare(beforeMap, afterMap, container, {});