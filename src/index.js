import L from "leaflet";

import Building from "./Building";
import wifiView from "./views/wifi";
import Store from "./store";

import GeoJSON from "./../data/UW_Buildings.geojson";
import OSMtoIST from "./../data/OSMtoIST.json";
import "./style.css";

window.UWWifiHeatMap = function(domElementID) {
	const map = new L.map(domElementID).setView([43.470348, -80.545016], 15);

	L.tileLayer("http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png", {
		maxZoom: 19,
		attribution: "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>"
	}).addTo(map);

	const store = new Store();

	const buildings = GeoJSON.features;
	for(let i = 0; i < buildings.length; i++) {
		const building = buildings[i];
		const ISTName = OSMtoIST[building.properties.name];
		const buildingGeoJSON = new Building(building, ISTName).addTo(map);
		buildingGeoJSON.subscribe(store);
	}

	wifiView().then(store.setState);
};

