// dev
import fakeAPI from './offline-fake-api/index.js';

const API = {
	getUser(id) {
		return fakeAPI.get('/user', id);
	},
	getArticles(resolve, reject, params) {
		return fakeAPI.get('/articles', params).then(resolve, reject);
	},
	getArticlesByTag(p) {
		return fakeAPI.get('/articles-by-tag', p);
	},
	getArticle(resolve, reject, id) {
		return fakeAPI.get('/article', id).then(resolve, reject);
	},
	register(userData) {
		return fakeAPI.post('/registration', JSON.stringify(userData));
	},
	loginWidthToken(token) {
		return fakeAPI.post('/auto-login', JSON.stringify(token));
	},
	login(login, password) {
		return fakeAPI.post('/login', { login, password });
	},
	logout(token) {
		return fakeAPI.post('/logout', token);
	},
	deleteAccount(token, id) {
		return fakeAPI.delete('/delete-account', { token, id });
	},
	editAccount(user, token, newData) {
		if (!user || !token || !newData) {
			console.log('uncurrect data for request!');
		}

		const postData = JSON.parse(
			JSON.stringify({
				user,
				token,
				newData,
			})
		);

		return fakeAPI.post('/edit-account', postData);
	},
	writeNewArticle(article, token, userID) {
		return fakeAPI.post('/new-article', {
			articleData: JSON.parse(JSON.stringify(article)),
			token,
			userID,
		});
	},
	sendComment(params) {
		return fakeAPI.post('/write-comment', params);
	},
	getArticlesByTagCount(tag) {
		return fakeAPI.get('/articles-by-tag-count', tag);
	},
	getPopularTags() {
		return fakeAPI.get('/popular-tags');
	},
	core: fakeAPI,
};

// /dev

// prod
// ...
// axios
// ...
// /prod

export { API };
export default API;
