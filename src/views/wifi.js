import 'whatwg-fetch';
import $ from 'jquery';
import {BuildingDataModel} from './../store';
import getColorForPercentage from './../colorMap';

function getWifiData() {
	const url = 'http://www.api.andrewgemmel.com/proxy/uwaterloo.ca/information-systems-technology/statistics/wifi-charts/building-select-index';

	const options =	{
		method: 'GET',
		headers: new Headers(),
		mode: 'cors',
		cache: 'default'
	};

	return fetch(url, options)
		.then((response) => response.text())
		.then((html) => {
			const table =  $('<div/>').html(html).find('tbody');
			const buildings = [];
			const query_time = new Date();

			table.children().each((i, row) => {
				const col = row.children;
				const data = {
					building: col[0].children[0].innerText,
					clientCount: col[2].innerText,
					downloadRate: col[3].innerText,
					uploadRate: col[4].innerText,
					time: query_time
				};
				buildings.push(data);
			});
			return Promise.resolve(buildings);
		});
}

function makePopup(building) {
	return (
`<div class='popup'>
<div>${building.building}</div>
<div>Clients: ${building.clientCount}</div>
<div>Download rate: ${building.downloadRate}</div>
<div>Upload rate: ${building.uploadRate}</div>
</div>`
	);
}

export default function wifiView() {
	return getWifiData()
	.then((buildings) => {
		let maxClientCount = 0;
		for(let j = 0; j < buildings.length; j++) {
			maxClientCount = Math.max(parseInt(buildings[j].clientCount), maxClientCount);
		}
		const state = {};

		buildings.forEach((b) => {
			state[b.building] = BuildingDataModel(
				b.building,
				makePopup(b),
				getColorForPercentage(parseInt(b.clientCount) / maxClientCount)
			);
		});
		return Promise.resolve(state);
	});
}
