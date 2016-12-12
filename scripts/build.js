const fs = require("node-fs-extra");
const _ = require("lodash");
const getWifiData = require("./scraper");

// copy source files to server root.
// Maybe someday we'll need a real build process but for now let's KISS
fs.copySync("src", "public");

// copy data to server root for playing around with
fs.copySync("data/UW_Buildings.geojson", "public/UW_Buildings.geojson");

// Transform geoJSON object into the minimum data span we need for displaying
// ~Optimize the payload we send to the browser~
const obj = JSON.parse(fs.readFileSync("data/ISTtoOSM.json", "utf8"));

// output formatted building data to server root
fs.appendFile("public/OSMtoIST.json", JSON.stringify(_.invert(obj), null, 2));

const url = "https://uwaterloo.ca/information-systems-technology/statistics/wifi-charts/building-select-index";

getWifiData(url)
.then((data) => {
	fs.appendFile("public/wifidata.json", JSON.stringify(data, null, 2));
});
