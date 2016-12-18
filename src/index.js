import L from "leaflet";

import Building from "./Building";
import "./style.css";

window.UWWifiHeatMap = function(domElementID) {
	const map = new L.map(domElementID).setView([43.470348, -80.545016], 15);

	L.tileLayer("http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png", {
		maxZoom: 19,
		attribution: "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>"
	}).addTo(map);

	let dict, wifiData, geojson;

	Promise.all([
		fetch("OSMtoIST.json").then((r) => r.json()).then((json) => dict = json),
		fetch("wifidata.json").then((r) => r.json()).then((json) => wifiData = json),
		fetch("UW_Buildings.geojson").then((r) => r.json()).then((json) => geojson = json)
	])
	.then(() => {
		const buildings = geojson.features;
		const wifiDict = {};
		for(let i = 0; i < wifiData.length; i ++) {
			wifiDict[wifiData[i].building] = wifiData[i];
		}
		let maxClientCount = 0;
		for(let j = 0; j < wifiData.length; j++) {
			maxClientCount = Math.max(parseInt(wifiData[j].clientCount), maxClientCount);
		}
		for(let i = 0; i < buildings.length; i++) {
			const building = buildings[i];
			const translation = dict[building.properties.name];
			if(!translation) continue;
			const wifi = wifiDict[translation];
			if(!wifi) continue;
			const data = {
				clientPercentage: parseInt(wifi.clientCount) / maxClientCount,
				raw: wifi
			};
			const buildingGeoJSON = new Building(building, data).addTo(map);
		}
	});
};

