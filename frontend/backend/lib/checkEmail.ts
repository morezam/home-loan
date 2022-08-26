export const checkEmail = (str: string) => {
	let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
	return pattern.test(str);
};
