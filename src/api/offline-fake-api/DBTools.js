function getUser(db, id) {
	return db.users.find((u) => u.id === id);
}

function getArticle(db, id) {
	return db.articles.find((u) => u.id === id);
}

function initTools(db) {
	return {
		getUser: (id) => getUser(db, id),
		getArticle: (id) => getArticle(db, id),
	};
}

export default initTools;
