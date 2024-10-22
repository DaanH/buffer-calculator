/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: {
				purple: '#42145f',
				violet: '#a90061',
				red: '#d52b1e',
				rubyRed: '#ca005d',
				pink: '#f092cd',
				orange: '#e17000',
				yellow: '#f9e11e',
				darkYellow: '#ffb612',
				brown: '#94710a',
				darkBrown: '#673327',
				green: '#39870c',
				darkGreen: '#275937',
				mintGreen: '#76d2b6',
				mossGreen: '#777b00',
				darkBlue: '#01689b',
				skyBlue: '#007bc7',
				lightBlue: '#8fcae7',
				background: '#f3f3f3',

				main: '#01689b',
				button: '#01689b',
				hover: '#01496d'
			}
		}
	},
	plugins: []
};
