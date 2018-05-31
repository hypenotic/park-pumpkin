<template>
	<div v-if="data != null">
		<section v-if="data && data.hasOwnProperty('meta_box')" style="background-image: url();background-size: cover; position: relative;">
			<img src="https://parkpeople.ca/listings/custom/uploads/2018/05/banner_flattened.png" alt="" class="main-banner">
			<div class="banner-text">
				<h1 v-html="data.meta_box._page_grant_heading"></h1>
				<div class="topContent" v-html="data.content.rendered"></div>
			</div>
		</section>

		<section class="map-section">
			<app-map></app-map>
		</section>

		<section class="event-templates">
			<h3 v-html="data.meta_box._page_buckets_main_heading"></h3>
			<div class="three-column wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s">
				<div v-for="bucket in data.meta_box._page_buckets" :key="bucket.bucket_copy">
					<h4 v-html="bucket._page_bucket_heading"></h4>
					<p v-html="bucket._page_bucket_copy"></p>
					<a :href="bucket._page_bucket_link" @click="downloadArea(bucket._page_bucket_heading)">Download .zip file</a>
				</div>
			</div> 
		</section>

		<!-- <section class="grants-newsletter">
			<div class="container">
				<p>Want to stay up-to-date on Park People news?</p>
				<a class="button" href="http://parkpeople.us2.list-manage.com/subscribe?u=ba963c8c64482c0ad756245c3&id=efc9b053b8" target="_blank">Get the Park People newsletter!</a>
			</div>
		</section> -->

		<!-- <section class="grant-sponsors">
			<p>Made possible by a great collaboration:</p>
			<ul>
				<li v-for="sponsor in data.meta_box._page_grant_sponsors" :key="sponsor['_page_g_sponsor_img']">
					<a :href="sponsor['_page_g_sponsor_link']" target="_blank"><img :src="sponsor['_page_g_sponsor_img']" alt="logo"></a>
				</li>
			</ul>
		</section> -->
		
		<!-- <app-related :title="data.meta_box._page_grant_resource_heading" :copy="data.meta_box._page_grant_resource_copy" :posts="relatedPosts"></app-related> -->
	</div>
	<div v-else class="loading-panel">
		<div>
			<img src="https://parkpeople.ca/listings/custom/uploads/2018/01/birdflying_pp_small.gif" alt="">
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import Map from '../components/map/Map.vue';
import RelatedList from '../components/related-resources/RelatedList.vue';
export default {
	components: {
		appMap: Map,
		appRelated: RelatedList
    },
	props: ['name'],
	data() {
		return {
			data: null,
			relatedPosts: [],
			errors: [],
			loading: true,
		};
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
			if (value.length < length)
			return value;	
			return value.substring(0, length) + suffix;
		},
		stripHTML(value) {
			return value.replace(/(<([^>]+)>)/ig,"");
		},
		toTitleCase(value) {
    		return value.replace(/\w\S*/g, (txt) => {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		},
	},
	computed: {

    },
	methods: {
		downloadArea(name) {
			console.log('download event', name);
			this.$ga.event('download', 'TD Grants Download', name, 1);
		}
	},
	mounted() {

	},
	created() {
		axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/pages/2394?_embed')
		.then(response => {
            console.log(response.data)
			this.data = response.data;
			
			this.loading = false;

			axios.all([
				axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/case-study/?_embed&categories=133&per_page=20'),
				axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/research/?_embed&categories=133&per_page=20'),
				axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/resource/?_embed&categories=133&per_page=20')
			])
			.then(axios.spread((response, response1, response2) => {
				// console.log(response.data)
				let allPosts  = response.data.concat(response1.data, response2.data);
				// console.log('old', allPosts)
				allPosts.sort(function(a,b){
					return new Date(b.date) - new Date(a.date)
				})	
				// console.log('sorted', allPosts)
				this.relatedPosts = allPosts
			}))
			.catch(e => {
				console.log(e)
				this.errors.push(e)
			})

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
@import '../styles/views/home.scss';

.main-banner {
	width: 100%;
	position: relative;
	z-index: 10;
}

.banner-text {
	position: absolute;
	z-index: 50;
	max-width: 70%;
	left: calc(15%);
	top: calc(50% - 150px);
}

.map-section {
	margin-top: -200px;
}

</style>