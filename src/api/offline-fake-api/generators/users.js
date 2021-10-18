/*
names:
	Abraham Adam Adrian Albert Alexander Alfred
	Anderson Andrew Benjamin Bernard Brian Caleb
	Calvin Carl Chad Daniel Darren David Derek
	Dirk Donald Douglas Dwight Edward Elliot Eric
	Ernest Felix Franklin Harry Hubert Jack Jesse
	John Joshua

second names:
	Johnson Williams Jones Brown Abels Evans Stone
	Roberts Mills Lewis Morgan Florence Campbell 
	Bronte Bell Adams Peters Gibson Martin Jordan
	Jackson Grant Davis Collins Bradley Barlow 
	Smith
*/

const images = [
	'https://www.meme-arsenal.com/memes/6381871fb8afa41cab763e7309b86bfb.jpg',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCusoIys5vjYAqq3-5P5PtDHYeZYGpIwwrJ6Ud8GPpUjwTUpLa16Lg9kR1pKH_Btywrf8&usqp=CAU',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRey31M2S5AiK1gq4ggI31GPRlrvP-RQfwrBwLXdih_AabQlNQ7pvpYTBzD93a2hhT7zWE&usqp=CAU',
	'https://steamuserimages-a.akamaihd.net/ugc/793108229627527791/5AE3D08A6B89A9D18130A822FB3843C7D94A8505/',
	'https://steamuserimages-a.akamaihd.net/ugc/793108229627513310/0D0629C60DB4548AE9BC17C7C4600A8906F5F68C/',
];

const users = [
	{
		id: 234861,
		name: 'Jessica Stillman',
		avatar: images[0],
		posts: [21033, 16422], //31211, 25719],
		commented: [31211, 12411, 76422],
		about: '',
		login: 'jess-still',
	},
	{
		id: 341445,
		name: 'Beau Beauchamp',
		avatar: images[2],
		posts: [12411, 14412],
		commented: [21033],
		about: '',
		login: 'bea-bea',
	},
	{
		id: 147511,
		name: 'Hubert Morgan',
		avatar: images[4],
		posts: [54612],
		commented: [21033],
		about:
			'I am an experienced content writer and digital marketing expert, with a proven track record of writing engaging, informative content. My diverse expertise creates powerful marketing campaigns that generate ROI across a wide range of industries',
		login: 'hub-mor',
	},
	{
		id: 976511,
		name: 'Harry Davis',
		avatar: images[1],
		posts: [],
		commented: [31211, 54612, 13442],
		about: '',
		login: 'harry342',
	},
	{
		id: 678901,
		name: 'Jack Jackson',
		avatar: images[3],
		posts: [76422],
		commented: [31211, 41318],
		about: '',
		login: 'love2life',
	},
	{
		id: 147511,
		name: 'Franklin Jones',
		avatar: images[0],
		posts: [13442],
		commented: [54612],
		about: '',
		login: 'franklin-jones',
	},
	{
		id: 213434,
		name: 'Eric Mills',
		avatar: images[2],
		posts: [41318],
		commented: [76422],
		about: '',
		login: 'love-like-that',
	},
	{
		id: 117234,
		name: 'Jesse Grant',
		avatar: images[2],
		posts: [],
		commented: [13442, 41318, 76422, 54612, 12411, 14412, 21033, 16422],
		about: '',
		login: 'jss-grnd',
	},
	{
		id: 192234,
		name: 'Brian Barlow',
		avatar: images[1],
		posts: [41244],
		commented: [13442, 41318, 16422],
		about: '',
		login: 'plo-wlo',
	},
	{
		id: 421444,
		name: 'Alexander Evans',
		avatar: images[4],
		posts: [41243],
		commented: [13442, 41318, 16422, 54612],
		about: '',
		login: 'alex663',
	},
].map((user) => ((user.password = 123456), user));

export const GET_USER = (id, subtracts = ['password'], usersDB = users) => {
	const user = JSON.parse(JSON.stringify(usersDB.find((u) => u.id === id)));

	if (user !== undefined) {
		subtracts.forEach((subtract) => {
			delete user[subtract];
		});
	}

	return user;
};

function GET_VALID_USER(id, subtracts = [], db = [], callback = (n) => n) {
	const user = GET_USER(id, subtracts, db);

	if (user !== undefined) {
		const isOK = callback(user);

		if (isOK) {
			return 1;
		}
	}

	return 0;
}

export function UPDATE_USER_DATA(id, newFields, usersDB = []) {
	return GET_VALID_USER(id, [], usersDB, (user) => {
		for (let field in newFields) {
			user[field] = newFields[field];
		}

		return 1;
	});
}

export function ADD_USER_POSTS(id, newPost, usersDB = []) {
	return GET_VALID_USER(id, [], usersDB, (user) => {
		user.posts.push(newPost);

		return 1;
	});
}

export function ADD_USER_COMMENTED(id, newComment, usersDB = []) {
	return GET_VALID_USER(id, [], usersDB, (user) => {
		user.commented.push(newComment);

		return 1;
	});
}

export default users;
