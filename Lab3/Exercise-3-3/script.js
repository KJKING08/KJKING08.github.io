// Pass the map a blank style
mapboxgl.accessToken =
  "pk.eyJ1IjoiemVsaWctam9obiIsImEiOiJjbGNwZHdyYzQxczh1M3NtcXhwa2Nhem9xIn0.YpfunhLLiXtLO-X8UKC0pg";

const map = new mapboxgl.Map({
  container: "map", // container element id
  style: "mapbox://styles/mapbox/light-v10",
  center: [-0.089932, 51.514442],
  zoom: 14
});

// Create a link to your Mapbox dataset
const data_url =
  "https://api.mapbox.com/datasets/v1/zelig-john/cldadi3290mas29ppvxhyxpfe/features?access_token=pk.eyJ1IjoiemVsaWctam9obiIsImEiOiJjbGNwZHdyYzQxczh1M3NtcXhwa2Nhem9xIn0.YpfunhLLiXtLO-X8UKC0pg";

// Render this GeoJSON using Mapbox JS API
map.on("load", () => {
  map.addLayer({
    id: "crimes",
    type: "circle",
    source: {
      type: "geojson",
      data: data_url
    },
    paint: {
      "circle-radius": 10,
      "circle-color": "#e34a33",
      "circle-opacity": 0.9
    }
  });

  //Slider interaction code goes below
  document.getElementById("slider").addEventListener("input", (event) => {
    //Get the month value from the slider
    const month = parseInt(event.target.value);

    // get the correct format for the data
    formatted_month = "2021-" + ("0" + month).slice(-2);

    //Create filters
    filterType = ["!=", ["get", "Crime type"], "placeholder"];
    filterMonth = ["==", ["get", "Month"], formatted_month];

    //set the map filter
    map.setFilter("crimes", ["all", filterMonth, filterType]);

    // update text in the UI
    document.getElementById("active-month").innerText = month;
  });

  //Radio button interaction code goes below
  document.getElementById("filters").addEventListener("change", (event) => {
    const type = event.target.value;
    console.log(type);
    // update the map filter
    if (type == "all") {
      filterType = ["!=", ["get", "Crime type"], "placeholder"];
    } else if (type == "shoplifting") {
      filterType = ["==", ["get", "Crime type"], "Robbery"];
    } else if (type == "bike") {
      filterType = ["==", ["get", "Crime type"], "Bicycle theft"];
    } else if (type == "sexual") {
      filterType = [
        "==",
        ["get", "Crime type"],
        "Violence and sexual offences"
      ];
    } else {
      console.log("error");
    }
    map.setFilter("crimes", ["all", filterMonth, filterType]);
  });
});

/*
Add an event listener that runs
when a user clicks on the map element.
*/
map.on("click", (event) => {
  // If the user clicked on one of your markers, get its information.
  const features = map.queryRenderedFeatures(event.point, {});
  if (!features.length) {
    return;
  }
  const feature = features[0];
  /*
Create a popup, specify its options
and properties, and add it to the map.
*/
  const popup = new mapboxgl.Popup({ offset: [0, -15], className: "my-popup" })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
      `<h2>Location: ${feature.properties["Location"]}</h2>
      <p>Reported by: ${feature.properties["Reported by"]}</p>
      <p>Crime type: ${feature.properties["Crime type"]}</p>
      <p>LSOA name: ${feature.properties["LSOA name"]}</p>`
    )
    .addTo(map);
});