import L from 'leaflet';
import store from './store';

export default class Building extends L.GeoJSON {
	constructor(GeoJSON, name) {
		super(GeoJSON,	{
			style: () => {
				return {
					fillOpacity: 1
				};
			},
		});
		this.name = name;
	}

	update(state = store.getState()) {
		this.data = state[this.name];
		this.unbindPopup();
		if (!this.data) {
			this.bindPopup(`<div>I have no data and my name is ${this.name} </div>`);
			return;
		}
		this.setStyle({
			color: this.data.color
		});
		this.bindPopup(this.data.popup);
	}

	subscribe(store) {
		store.subscribe(this.update.bind(this));
	}
}
