import L from "leaflet";
import getColorForPercentage from "./colorMap";

export default class Building extends L.GeoJSON {
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

	setColor(color) {
		this.setStyle({
			color
		});
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
