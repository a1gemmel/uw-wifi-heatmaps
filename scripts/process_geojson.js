var fs = require("fs");
var obj = JSON.parse(fs.readFileSync("data/buildings.geojson", "utf8"));
var _ = require("lodash");

function formatBuilding(building) {
	return {
		name: building.properties.name,
		alt_name: building.properties.alt_name,
		coordinates: building.geometry.coordinates
	};
}

var buildings = _.map(obj.features, formatBuilding);

fs.writeFileSync("data/buildings.json", JSON.stringify(buildings, null, 2));
