export function BuildingDataModel(name, popup, color) {
	return {
		name, popup, color
	};
}

export default class Store {
	constructor() {
		this.state = {};
		this.subscribers = [];

		this.setState = this.setState.bind(this);
		this.subscribe = this.subscribe.bind(this);
	}
	subscribe(callback) {
		this.subscribers.push(callback);
	}
	publish() {
		this.subscribers.forEach((fn) => {
			fn(this.state);
		});
	}
	setState(state) {
		this.state = {
			...this.state,
			...state
		};
		this.publish();
	}
}
