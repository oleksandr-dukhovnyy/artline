import users from './generators/users.js';
import articles from './generators/articles.js';

const DB = {
	users,
	articles,
};

export default JSON.stringify(DB);
