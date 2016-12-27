const nedb = require('nedb');
const getWifiData = require('./scraper.js');

const POLL_INTERVAL = 1000 * 60 * 15;

let db = new nedb({
	filename: 'data/wifi.db',
	autoload: true,
});

const url = 'https://uwaterloo.ca/information-systems-technology/statistics/wifi-charts/building-select-index';

function saveData() {
	getWifiData(url)
	.then((data) => {
		db.insert(data);
	});
}

saveData();

setInterval(saveData, POLL_INTERVAL);
