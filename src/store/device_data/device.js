import device from 'current-device';

export default {
	// actions: {},
	// mutations: {},
	state: {
		device,
	},
	getters: {
		DEVICE_OS: (s) => s.device.os,
		DEVICE_TYPE: (s) => s.device.os,
		DEVICE_SCREEN_WIDTH: () => window.innerWidth,
		DEVICE_SCREEN_HEIGHT: () => window.innerHeight,
		DEVICE_ORIENTATION: (s) => s.device.orientation,
	},
};
