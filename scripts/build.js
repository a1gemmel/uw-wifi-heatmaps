const fs = require("node-fs-extra");
const _ = require("lodash");
const getWifiData = require("./scraper");

// copy source files to server root.
// Maybe someday we'll need a real build process but for now let's KISS
fs.copySync("src", "public", console.log);

// Transform geoJSON object into the minimum data span we need for displaying
// ~Optimize the payload we send to the browser~
const obj = JSON.parse(fs.readFileSync("data/buildings.geojson", "utf8"));

function formatBuilding(building) {
	return {
		name: building.properties.name,
		alt_name: building.properties.alt_name,
		coordinates: building.geometry.coordinates
	};
}

const buildings = _.map(obj.features, formatBuilding);

// output formatted building data to server root
fs.appendFile("public/buildings.json", JSON.stringify(buildings, null, 2));


const url = "https://uwaterloo.ca/information-systems-technology/statistics/wifi-charts/building-select-index";

getWifiData(url)
.then((data) => {
	fs.appendFile("public/wifidata.json", JSON.stringify(data, null, 2));
});
