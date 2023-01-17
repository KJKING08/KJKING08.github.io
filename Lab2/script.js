// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
  "pk.eyJ1IjoiemVsaWctam9obiIsImEiOiJjbGNwZHdyYzQxczh1M3NtcXhwa2Nhem9xIn0.YpfunhLLiXtLO-X8UKC0pg";

// Define a map object by initialising a Map from Mapbox
const map = new mapboxgl.Map({
  container: "map",
  // Replace YOUR_STYLE_URL with your style URL.
  style: "mapbox://styles/zelig-john/cld0bdcnq000914pkqo1g28xr"
});

map.on("mousemove", (event) => {
  const dzone = map.queryRenderedFeatures(event.point, {
    layers: ["glasgow-simd"]
  });
  document.getElementById("pd").innerHTML = dzone.length
    ? `<h3>${dzone[0].properties.DZName}</h3><p>Rank: <strong>${dzone[0].properties.Percentv2}</strong> %</p>`
    : `<p>Hover over a data zone!</p>`;
  // Add the feature to the hover layer once the mouse moves to a data zone
  map.getSource("hover").setData({
    type: "FeatureCollection",
    features: dzone.map(function (f) {
      return { type: "Feature", geometry: f.geometry };
    })
  });
});

// Add another listener which allows to show the legend once the map is loaded. Creates legend colour boxes using the colours and legend that we defined in the Mapbox Studio.
map.on("load", () => {
  const layers = [
    "<10",
    "20 ",
    "30 ",
    "40 ",
    "50 ",
    "60 ",
    "70 ",
    "80 ",
    "90 ",
    "100"
  ];
  const colors = [
    "#67001f",
    "#b2182b",
    "#d6604d",
    "#f4a582",
    "#fddbc7",
    "#d1e5f0",
    "#92c5de",
    "#4393c3",
    "#2166ac",
    "#053061"
  ];

  // create legend
  const legend = document.getElementById("legend");

  layers.forEach((layer, i) => {
    const color = colors[i];
    const key = document.createElement("div");
    //place holder
    key.className = "legend-key";
    key.style.backgroundColor = color;
    key.innerHTML = `${layer}`;

    legend.appendChild(key);
    if (i <= 1 || i >= 8) {
      key.style.color = "white";
    }
  });

  // Create an empty feature layer
  map.addSource("hover", {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] }
  });

  // Style the feature that your mouse is hovering on
  map.addLayer({
    id: "dz-hover",
    type: "line",
    source: "hover",
    layout: {},
    paint: {
      "line-color": "white",
      "line-width": 2
    }
  });
});

// Add a geocoder search control.
const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false, // Do not use the default marker style
  placeholder: "Search for places in Glasgow", // Placeholder text for the search bar
  proximity: {
    longitude: 55.8642,
    latitude: 4.2518
  } // Coordinates of Glasgow center
});

map.addControl(geocoder, "top-left");

// Add a navigation control to the top-left.
map.addControl(new mapboxgl.NavigationControl(), "top-left");

// Add a find my current location control.
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  }),
  "top-left"
);