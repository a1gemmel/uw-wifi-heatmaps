const fs = require("node-fs-extra");
const _ = require("lodash");
const getWifiData = require("./scraper");

// copy source files to server root.
// Maybe someday we'll need a real build process but for now let's KISS
fs.copySync("src", "public");

// copy data to server root for playing around with
fs.copySync("data/UW_Buildings.geojson", "public/UW_Buildings.geojson");
fs.copySync("data/OSMtoIST.json", "public/OSMtoIST.json");

const url = "https://uwaterloo.ca/information-systems-technology/statistics/wifi-charts/building-select-index";

getWifiData(url)
.then((data) => {
	fs.appendFile("public/wifidata.json", JSON.stringify(data, null, 2));
});
