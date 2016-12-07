(function () {

	window.UWWifiHeatMap = function(domElementID) {
		const map = new L.map(domElementID).setView([43.470348, -80.545016], 15);

		L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
			attribution: "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>"
		}).addTo(map);

		fetch("buildings.geojson")
			.then((response) => {
				response.json().then((data) => {
					L.geoJSON(data).addTo(map);
				});
			});
	};
}());
