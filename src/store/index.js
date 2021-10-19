import Vue from 'vue';
import Vuex from 'vuex';

import Articles from '@/store/feed/articles';
import APIs from '@/store/apis/apis.js';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		articles: Articles,
		APIs,
	},
});
