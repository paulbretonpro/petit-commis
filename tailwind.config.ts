export default {
	content: [
		'./components/**/*.{vue,ts}',
		'./pages/**/*.{vue,ts}',
		'./app.vue'
	],
  theme: {
  	extend: {
  		container: {
  			padding: {
  				DEFAULT: '1rem',
  				sm: '2rem',
  				lg: '8rem',
  				xl: '10rem',
  				'2xl': '12rem'
  			}
  		},
  	}
  },
  plugins: [],
}