const cheerio = require('cheerio');
const request = require('request');


function getWifiData(url) {
	return new Promise((resolve, reject) => {
		request(url, (error, response, html) => {
			if (error) reject();

			const $ = cheerio.load(html);
			const table = $('tbody');
			const buildings = [];
			const query_time = new Date();

			table.children().each((i, row) => {
				const col = row.children;
				const data = {
					building: col[0].children[0].children[0].data,
					clientCount: col[2].children[0].data,
					downloadRate: col[3].children[0].data,
					uploadRate: col[4].children[0].data,
					time: query_time
				};
				buildings.push(data);
			});
			resolve(buildings);
		});
	});
}

module.exports = getWifiData;
