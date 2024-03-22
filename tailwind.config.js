/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'false',
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [require('@tailwindcss/forms')],
}
