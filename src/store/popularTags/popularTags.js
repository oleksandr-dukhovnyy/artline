import API from '@/api/index.api';

export default {
	actions: {
		async loadPopularTags({ commit }) {
			const popularTagsRequest = API.getPopularTags();

			commit('setPopularTagsLoading', true);

			popularTagsRequest.then((res) => {
				// console.log('res', res);
				commit('setPopularTags', res);
				commit('setPopularTagsLoaded', true);
				commit('setPopularTagsLoading', false);
			});

			popularTagsRequest.catch((res) => {
				commit('setError', res);
				commit('setPopularTagsLoading', false);
			});
		},
	},
	mutations: {
		setPopularTagsLoading(state, payload) {
			state.conditions.popularTagsLoading = payload;
		},
		setPopularTags(state, payload) {
			state.data.popularTags = payload;
		},
		setError(state, msg) {
			state.errors.msg = msg;
		},
		setPopularTagsLoaded(state, payload = true) {
			state.conditions.popularTagsLoaded = payload;
		},
	},
	state: {
		data: {
			popularTags: [],
		},
		conditions: {
			popularTagsLoading: false,
			popularTagsLoaded: false,
		},
		errors: {
			popularTagsError: false,
			msg: '',
		},
	},
	getters: {
		popularTags: (state) => state.data.popularTags,
		popularTagsError: (state) => state.errors.popularTagsError,
		popularTagsLoaded: (state) => state.conditions.popularTagsLoaded,
	},
};
