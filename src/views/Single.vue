<template>
<div>
	<img class="heading" src="https://parkpeople.ca/listings/custom/uploads/2018/01/placeimg_1000_500_nature2.jpg">
	<section style="margin-top: -200px;">
		<div class="columns">
			<div class="column is-three-fifths is-offset-one-fifth">
				<h1 v-html="data.meta_box._page_grant_faq_heading"></h1>
				<div class="FAQ-content" v-html="data.meta_box._page_grant_faq_copy"></div>
			</div>
		</div>
	</section>
</div>
</template>

<script>
import axios from 'axios';
export default {
	data() {
		return {
			errors: [],
			slug: this.$route.params.slug,
			id: this.$route.params.id,
			post: [],
			showSocialShare: false,
			fullPath: this.$route.fullPath,
			relatedPosts: [],
			language: '',
			data: []
		}
	},
	filters: {
		removeHyphen(value){
			return value.replace("-", ' ');
		},
		capitalizeFirstLetter(value) {
			return value.charAt(0).toUpperCase() + value.slice(1);
		},
		toUppercase(value) {
			return value.toUpperCase();
		},
		readMore(value, length, suffix) {
			if (value.length < length) {
				return value;
			} else {	
				return value.substring(0, length) + suffix;
			}
		},
		stripHTML(value) {
			return value.replace(/(<([^>]+)>)/ig,"");
		},
		toTitleCase(value)
			{
    		return value.replace(/\w\S*/g, (txt) => {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		}
	},
	methods: {
		moment: () => {
			return moment();
		},
	},
	created() {
		console.log('list')
		axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/pages/1825?_embed')
		.then(response => {
            console.log(response.data)
			this.data = response.data
		})
		.catch(e => {
			console.log(e)
			this.errors.push(e)
		})
		
	},
};
</script>

<style lang="scss" scoped>

@import '../styles/variables.scss';

.column {
	background-color: white; 
	padding: 72px 72px 0;
	position: relative;
	margin-bottom: 30px;
	@media #{$small-and-down} {
        padding: 40px;
    }
}

h1 {
	color: $off-black;
	font-size: 2.5rem;
	line-height: 1.3;
	margin-bottom: 24px;
	font-weight: bold;
}

img.heading {
	position: relative;
	z-index: -1;
	margin-top: -60px;
	height: 300px;
	width: 100%;
	object-fit:cover;
  	object-position: 0 20%;
	-webkit-clip-path: polygon(0 20%, 100% 0, 100% 80%, 0% 100%);
    clip-path: polygon(0 20%, 100% 0, 100% 80%, 0% 100%);
}

.FAQ-content {
	h2 {
		font-size: 1.5rem;
		line-height: 1.5;
	}
	ul {
		margin: 20px 0 0 40px;
		li {
			line-height: 1.5;
			margin-bottom: 1rem;
			list-style-type: disc;
			font-size: .9rem;
			padding-left: .6em;

		}
	}
}



</style>