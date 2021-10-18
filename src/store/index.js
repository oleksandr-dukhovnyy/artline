import Vue from 'vue';
import Vuex from 'vuex';

import Articles from '@/store/feed/articles';
import Auth from '@/store/auth/auth.js';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		articles: Articles,
		auth: Auth,
	},
});
