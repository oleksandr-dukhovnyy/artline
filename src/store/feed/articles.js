import API from '@/api/index.api';

export default {
	actions: {
		async getArticlesByTagCount({ commit }, tag) {
			const getArticlesByTagCount = API.getArticlesByTagCount(tag);

			getArticlesByTagCount.then((count) => {
				// console.log('count', count);
				commit('setArticlesByTagCount', count);
			});

			getArticlesByTagCount.catch((res) => {
				console.error(res);
			});
		},
		async loadArticles({ commit }, { from = 0, to = 10 } = {}) {
			commit('setArticlesLoading', true);

			API.getArticles(
				({ articles, paginationPages }) => {
					console.log(articles, paginationPages);
					commit('setArticles', articles);
					commit('setPagination', paginationPages);

					commit('setArticlesLoading', false);
				},
				(err) => {
					commit('setArticlesLoading', false);
					console.log('error', err);
				},
				{ from, to }
			);
		},
		async loadArticlesByTag({ commit }, { tag, from = 0, to = 10 }) {
			commit('setArticlesByTagLoading', true);
			const articles = API.getArticlesByTag({ tag, from, to });

			articles.then(({ articles, paginationPages }) => {
				commit('setPagination', paginationPages);
				commit('setArticlesByTag', articles);

				commit('setArticlesByTagLoading', false);
			});

			articles.catch((res) => {
				commit('setArticlesByTagLoading', false);
				console.error(res);
			});
		},
	},
	mutations: {
		setArticlesLoading(state, payload) {
			state.conditions.articlesLoading = payload;
		},
		setArticles(state, payload) {
			state.data.articles = payload;
		},
		setArticlesByTag(state, payload) {
			state.data.articlesByTag = payload;
		},
		setArticlesByTagLoading(state, payload) {
			state.conditions.articlesByTagLoading = payload;
		},
		setArticlesByTagCount(state, payload) {
			state.data.articlesByTagCount = payload;
		},
		setPagination(state, payload) {
			state.data.pagination = payload;
		},
	},
	state: {
		data: {
			articles: [],
			articlesByTag: [],
			articlesByTagCount: null,
			pagination: [],
		},
		conditions: {
			articlesLoading: false,
			articlesByTagLoading: false,
		},
		errors: {
			articlesLoadOk: true,
		},
	},
	getters: {
		articles: (state) => state.data.articles,
		articlesByTag: (state) => state.data.articlesByTag,
		articlesLoading: (state) => state.conditions.articlesLoading,
		articlesByTagLoading: (state) => state.conditions.articlesByTagLoading,
		articlesLoaded: (state) => state.data.articles.length > 0,
		articlesByTag: (state) => state.data.articlesByTag,
		articlesByTagCount: (state) => state.data.articlesByTagCount,
		paginationItems: (state) => state.data.pagination,
	},
};
