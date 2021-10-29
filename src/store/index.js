import Vue from 'vue';
import Vuex from 'vuex';

import Articles from '@/store/feed/articles';
import APIs from '@/store/apis/apis.js';
import popularTags from '@/store/popularTags/popularTags.js';
import deviceData from '@/store/device_data/device.js';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		articles: Articles,
		APIs,
		popularTags,
		deviceData,
	},
});
