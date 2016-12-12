(function () {

	class Building extends L.GeoJSON {
		constructor(data, wifiData) {
			const color = getColorForPercentage(wifiData.clientPercentage);
			super(data,	{
				style: () => {
					return {
						color,
						fillOpacity: 1
					};
				},
				onEachFeature: (feature) => {
				}
			});
			this.wifiData = wifiData;
			this.addEventListeners();
		}

		addEventListeners() {
			this.bindPopup(
`<div class='popup'>
	<div>${this.wifiData.raw.building}</div>
	<div>Clients: ${this.wifiData.raw.clientCount}</div>
	<div>Download rate: ${this.wifiData.raw.downloadRate}</div>
	<div>Upload rate: ${this.wifiData.raw.uploadRate}</div>
</div>`
			);
		}
	}

	const percentColors = [
		{ pct: 0, color: { r: 0x33, g: 0x00, b: 0x1A } },
		{ pct: 0.33, color: { r: 0xB3, g: 0x00, b: 0x00 } },
		{ pct: 0.66, color: { r: 0xff, g: 0x47, b: 0x1A } },
		{ pct: 1.0, color: { r: 0xff, g: 0xff, b: 0x00 } }
	];

	function getColorForPercentage(pct) {
		let i = 1;
		for (; i < percentColors.length - 1; i++) {
			if (pct < percentColors[i].pct) {
				break;
			}
		}
		const lower = percentColors[i - 1];
		const upper = percentColors[i];
		const range = upper.pct - lower.pct;
		const rangePct = (pct - lower.pct) / range;
		const pctLower = 1 - rangePct;
		const pctUpper = rangePct;
		const color = {
			r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
			g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
			b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
		};
		return "rgb(" + [color.r, color.g, color.b].join(",") + ")";
		// or output as hex if preferred
	}


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
}());
