import API from '@/api/index.api';

export default {
	actions: {
		async loadArticles({ commit }) {
			commit('setArticlesLoading', true);

			API.getArticles(
				(articles) => {
					commit('setArticlesLoading', false);
					commit('setArticles', articles);
				},
				(err) => {
					commit('setArticlesLoading', false);
					console.log('error', err);
				}
			);
		},
	},
	mutations: {
		setArticlesLoading(state, payload) {
			state.conditions.articlesLoading = payload;
		},
		setArticles(state, payload) {
			state.data.articles = payload;
		},
	},
	state: {
		data: {
			articles: [],
		},
		conditions: {
			articlesLoading: false,
		},
		errors: {
			articlesLoadOk: true,
		},
	},
	getters: {
		articles: (state) => state.data.articles,
		articlesLoading: (state) => state.conditions.articlesLoading,
		articlesLoaded: (state) => state.data.articles.length > 0,
	},
};
