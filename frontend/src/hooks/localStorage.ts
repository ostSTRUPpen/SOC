const saveToLocalStorage = (
	key: string,
	value: string | boolean | number
): boolean => {
	localStorage.setItem(key, JSON.stringify(value));
	return true;
};

const readFromLocalStorage = (key: string) /*: string | number*/ => {
	const item = localStorage.getItem(key);
	if (item === null || item === "null") {
		return "Not found";
	}
	return JSON.parse(item);
};

const removeFromLocalStorage = (key: string) => {
	localStorage.removeItem(key);
};

const clearLocalStorage = () => {
	localStorage.clear();
};

export {
	saveToLocalStorage,
	readFromLocalStorage,
	removeFromLocalStorage,
	clearLocalStorage,
};
