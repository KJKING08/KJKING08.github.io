// Access token
mapboxgl.accessToken =
  "pk.eyJ1IjoiemVsaWctam9obiIsImEiOiJjbGNwZHdyYzQxczh1M3NtcXhwa2Nhem9xIn0.YpfunhLLiXtLO-X8UKC0pg";

// link to dataset (to create a new layer for the symbols)
const dataUrl =
  "https://api.mapbox.com/datasets/v1/zelig-john/cle05nnkk37p228pn6l4it0ej/features?access_token=pk.eyJ1IjoiemVsaWctam9obiIsImEiOiJjbGNwZHdyYzQxczh1M3NtcXhwa2Nhem9xIn0.YpfunhLLiXtLO-X8UKC0pg";

// url to style
const styleUrl = "mapbox://styles/zelig-john/cldgshc9d002901n0n0zrqsmv";

// set init coordinate
const latitude = 55.86;
const longitude = -4.26;

// Create a new map
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: styleUrl, // style: "mapbox://styles/mapbox/light-v10",
  center: [longitude, latitude], // starting position [lng, lat]
  zoom: 18 // starting zoom
});

// set botton-right function area
//map.addControl(new MapboxDirections(), 'bottom-right');             // Directions
map.addControl(new mapboxgl.NavigationControl(), "bottom-right"); // Navigation control
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  }),
  "bottom-right"
); // Find my current location control

// set init filter
var filterType = ["!=", ["get", "classname"], "placeholder"]; // select all

// Function: sort table alphabetical according to column
function sortTable(table, column) {
  //    console.log(table.innerHTML);
  var rows, switching, i, x, y, shouldSwitch;
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 0; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[column];
      y = rows[i + 1].getElementsByTagName("TD")[column];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  // console.log("sortTable()done, table sorted alphabeticaly");
}

// Function: update the table body based on the selected data
function updateTable(selectedData) {
  var sideTabBody = document.getElementById("sideTabBody");
  sideTabBody.innerHTML = "";
  for (let i = 0; i < selectedData.length; i++) {
    if (selectedData[i].properties.postcode == undefined) {
    } else {
      var newRow = sideTabBody.insertRow(sideTabBody.length);
      var poiName = newRow.insertCell(0);
      var poiPostcode = newRow.insertCell(1);
      poiName.innerHTML = selectedData[i].properties.name;
      poiPostcode.innerHTML = selectedData[i].properties.postcode;
      newRow.addEventListener("click", () => {
        map.flyTo({
          center: [
            selectedData[i].geometry.coordinates[0],
            selectedData[i].geometry.coordinates[1]
          ],
          zoom: 15,
          duration: 2000,
          essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
      });
    }
  }
  // if (sideTabBody.innerHTML == ""){
  //     console.log("updateTable() detected empty table body, table update fail");
  // } else {
  //     console.log("updateTable()done, table updated");
  // }
}

// Function: set filter based on event target value
function changeFilter(eventTargetValue) {
  if (eventTargetValue == "Alcoholic Drinks") {
    filterType = ["==", ["get", "classname"], "Alcoholic Drinks"];
  } else if (eventTargetValue == "All") {
    filterType = ["!=", ["get", "classname"], "placeholder"];
  } else if (
    eventTargetValue ==
    "Alcoholic Drinks Including Off Licences and Wholesalers"
  ) {
    filterType = [
      "==",
      ["get", "classname"],
      "Alcoholic Drinks Including Off Licences and Wholesalers"
    ];
  } else if (eventTargetValue == "Bakeries") {
    filterType = ["==", ["get", "classname"], "Bakeries"];
  } else if (eventTargetValue == "Baking And Confectionery") {
    filterType = ["==", ["get", "classname"], "Baking And Confectionery"];
  } else if (eventTargetValue == "Butchers") {
    filterType = ["==", ["get", "classname"], "Butchers"];
  } else if (eventTargetValue == "Cash And Carry") {
    filterType = ["==", ["get", "classname"], "Cash And Carry"];
  } else if (eventTargetValue == "Catering and Non Specific Food Products") {
    filterType = [
      "==",
      ["get", "classname"],
      "Catering and Non Specific Food Products"
    ];
  } else if (eventTargetValue == "Confectioners") {
    filterType = ["==", ["get", "classname"], "Confectioners"];
  } else if (
    eventTargetValue == "Convenience Stores and Independent Supermarkets"
  ) {
    filterType = [
      "==",
      ["get", "classname"],
      "Convenience Stores and Independent Supermarkets"
    ];
  } else if (eventTargetValue == "Dairy Farming") {
    filterType = ["==", ["get", "classname"], "Dairy Farming"];
  } else if (eventTargetValue == "Dairy Products") {
    filterType = ["==", ["get", "classname"], "Dairy Products"];
  } else if (eventTargetValue == "Delicatessens") {
    filterType = ["==", ["get", "classname"], "Delicatessens"];
  } else if (eventTargetValue == "Fish, Meat and Poultry Products") {
    filterType = [
      "==",
      ["get", "classname"],
      "Fish, Meat and Poultry Products"
    ];
  } else if (eventTargetValue == "Fishmongers") {
    filterType = ["==", ["get", "classname"], "Fishmongers"];
  } else if (eventTargetValue == "Frozen Foods") {
    filterType = ["==", ["get", "classname"], "Frozen Foods"];
  } else if (eventTargetValue == "Fruit, Flower and Vegetable Growers") {
    filterType = [
      "==",
      ["get", "classname"],
      "Fruit, Flower and Vegetable Growers"
    ];
  } else if (eventTargetValue == "Green and New Age Goods") {
    filterType = ["==", ["get", "classname"], "Green and New Age Goods"];
  } else if (eventTargetValue == "Grocers, Farm Shops and Pick Your Own") {
    filterType = [
      "==",
      ["get", "classname"],
      "Grocers, Farm Shops and Pick Your Own"
    ];
  } else if (eventTargetValue == "Markets") {
    filterType = ["==", ["get", "classname"], "Markets"];
  } else if (eventTargetValue == "Milling, Refining and Food Additives") {
    filterType = [
      "==",
      ["get", "classname"],
      "Milling, Refining and Food Additives"
    ];
  } else if (eventTargetValue == "Non Alcoholic Drinks") {
    filterType = ["==", ["get", "classname"], "Non Alcoholic Drinks"];
  } else if (eventTargetValue == "Organic, Health, Gourmet and Kosher Foods") {
    filterType = [
      "==",
      ["get", "classname"],
      "Organic, Health, Gourmet and Kosher Foods"
    ];
  } else if (eventTargetValue == "Supermarket Chains") {
    filterType = ["==", ["get", "classname"], "Supermarket Chains"];
  } else if (eventTargetValue == "Tea and Coffee Merchants") {
    filterType = ["==", ["get", "classname"], "Tea and Coffee Merchants"];
  } else {
    console.log("error, event target value: " + eventTargetValue);
  }
  // console.log("changeFilter() done, filter set to: " + filterType);
}

// Function: add symbol layer
function addSymbolLayer() {
  map.addLayer({
    id: "GGiG", // id of the new later for symbol
    type: "symbol", // this layer is for symbol
    source: {
      type: "geojson",
      data: dataUrl
    },
    layout: {
      "icon-image": "basket", // name of the icon we upload to the mapbox style in advance
      "icon-size": [
        // icon size auto adjust by zoom
        "interpolate",
        ["linear"],
        ["zoom"],
        10,
        1,
        12,
        1.5,
        14,
        2
      ]
    },
    paint: { "icon-opacity": 0.5 },
    filter: filterType // show all symbols by default
  });
  // console.log("addSymbolLayer() done, symbol layer added");
}

// listen for map load
map.on("load", () => {
  // console.log("map load detected");
  // set map load animation
  const bounds = new mapboxgl.LngLatBounds(); // create a bounds
  // bounds.extend([longitude - 0.15, latitude - 0.12]); // adjust the bounds based on the init coordinate we set before
  // bounds.extend([longitude + 0.03, latitude + 0.12]);
  bounds.extend([longitude - 0.08, latitude - 0.08]); // adjust the bounds based on the init coordinate we set before
  bounds.extend([longitude + 0.08, latitude + 0.08]);
  map.fitBounds(bounds, { duration: 2000, padding: 20 }); // use map.fitBounds to create a zoom out animation, zooming from the init zoom to bounds

  // console.log("addSymbolLayer() start");
  // add symbol layer
  addSymbolLayer();

  // console.log("user selection initialization start");
  var filterValue = document.querySelector('input[name="filter"]:checked')
    .value;
  var userSelect = document.getElementById("userSelect");
  userSelect.innerHTML = filterValue;
  // console.log("user selection initialized to: " + filterValue);

  // console.log("first changeFilter() start");
  // change filter
  changeFilter(filterValue);

  // console.log("start apply filters");
  // apply filters
  map.setFilter("GGiG", ["all", filterType]);
  // console.log("filters applied to map layer");

  // console.log("first time data update start");
  // generate selected data based on rendered features in layer GGiG with filter: filterType
  var selectedData = map.queryRenderedFeatures({
    Layers: "GGiG",
    Filter: filterType
  });
  // console.log("first time data update complete，filterType: " + filterType);
  // console.log(selectedData);

  // console.log("first updateTable() start");
  updateTable(selectedData);

  // console.log("first sortTable() start");
  sortTable(sideTabBody, 0);
});

// listen for map zoom
map.on("zoom", function () {
  const zoom = map.getZoom();
  if (zoom > 13) {
    map.setLayoutProperty("GGiG", "icon-allow-overlap", true);
    map.setLayoutProperty("GGiG", "icon-ignore-placement", true);
  } else {
    map.setLayoutProperty("GGiG", "icon-allow-overlap", false);
    map.setLayoutProperty("GGiG", "icon-ignore-placement", false);
  }
});

// listen for click on map
map.on("click", (event) => {
  // console.log("click on map detected");
  const features = map.queryRenderedFeatures(event.point, { layers: ["GGiG"] });
  if (!features.length) {
    return;
  }
  const feature = features[0];

  const popup = new mapboxgl.Popup({
    offset: [0, -15],
    className: "clickPopup",
    closeButton: false // hide the close button
  })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
      `
        <div class="pointName">
            <b>
                ${feature.properties.name}
            </b>
        </div>
        <div class="pointRoad">
            ${feature.properties.street_name}
        </div>
        <div class="pointPostcode">
            ${feature.properties.postcode}
        </div>
        <div class="pointURL">
            <a href="${feature.properties.url}" target="_blank">
                ${feature.properties.url}
            </a>
        </div>
        `
    )
    .addTo(map);
});

// listen for click on filter
//document.getElementById("filters").addEventListener("click", (event) => {
document.querySelector("#filters").addEventListener("click", (event) => {
  // console.log("click on filters detected");

  // console.log("user selection update start");
  var filterValue = document.querySelector('input[name="filter"]:checked')
    .value;
  var userSelect = document.getElementById("userSelect");
  userSelect.innerHTML = filterValue;
  // console.log("user selection updated to: " + filterValue);

  // console.log("changeFilter() start");
  // change filter
  changeFilter(filterValue);

  // apply filter
  map.setFilter("GGiG", ["all", filterType]);
  // console.log("filters applied to map layer");

  // console.log("data update start");
  // generate selected data based on rendered features in layer GGiG with filter: filterType
  var selectedData = map.queryRenderedFeatures({
    Layers: "GGiG",
    Filter: filterType
  });
  //    var selectedData = map.querySourceFeatures("GGiG", {
  //      filter: filterType
  //    });
  // console.log("data upated，filterType：" + filterType);
  // console.log(selectedData);

  // console.log("updateTable() start");
  updateTable(selectedData);

  // console.log("sortTable() start");
  sortTable(sideTabBody, 0);
});