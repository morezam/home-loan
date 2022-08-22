/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#00aef2',
				secondary: '#e2f3f5',
				background: '#C4F1FD',
				sidebar: '#023146',
			},
		},
	},
	plugins: [],
};
