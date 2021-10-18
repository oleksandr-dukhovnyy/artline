const normalize = (n) => {
	return n < 10 ? `0${n}` : n;
};

const getDate = () => {
	const d = new Date();

	const date = normalize(d.getDate());
	const month = normalize(d.getMonth() + 1);
	const year = `${d.getFullYear()}`.replace(/^../g, '');

	const hours = normalize(d.getHours());
	const minutes = normalize(d.getMinutes());

	return `${date}.${month}.${year}, ${hours}:${minutes}`;
};

export default getDate;
