<template>
	<div v-if="data != null">
		<section v-if="data && data.hasOwnProperty('meta_box')" style="background-image: url();background-size: cover; position: relative;z-index: 5000;">
			<img src="https://parkpeople.ca/listings/custom/uploads/2018/05/banner_flattened.png" alt="" class="main-banner">
			<div class="banner-text">
				<h1 v-html="data.meta_box._page_grant_heading"></h1>
				<input id="pac-input" type="text" name="findnear" placeholder="Find a pumpkin parade near you">
				<input id="pac-submit" type="submit" value="">
			</div> 
		</section>

		<section class="map-section">
			<app-map></app-map>
		</section>

		<section class="full-width vid-ig">
			<div class="container--extra-wide">
				<div class="split">
					<div class="split-video">
						<div class="intrinsic-container intrinsic-container-16x9">
							<iframe src="//www.youtube.com/embed/" allowfullscreen></iframe>
						</div>
					</div>
					<div class="split-ig">
						<div class="split-ig--text">
							<p>#pumpkinparade</p>
							<a href="http://instagram.com/parkpeopleto"><i class="fa fa-instagram" aria-hidden="true"></i> See all</a>
						</div>
						<img src="src/assets/park_ig.png" alt="">
					</div>
				</div>
			</div>
		</section>

		<section class="more-info">
			<div class="container">
				<h2>Simple Steps to Planning Your Pumpkin Parade</h2>
				<div class="topContent" v-html="data.meta_box._page_grant_more_info"></div>
			</div>
		</section>

		<section class="event-templates">
			<h2 v-html="data.meta_box._page_tri_section[0]._page_tri_section_heading"></h2>
			<div class="three-column fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s">
				<div v-for="bucket in data.meta_box._page_tri_section[0]._page_triple" :key="bucket.bucket_copy">
					<h3 v-html="bucket._page_tri_heading"></h3>
					<p v-html="bucket._page_tri_copy"></p>
					<a :href="bucket._page_tri_button_link" @click="downloadArea(bucket._page_tri_heading)">Download .zip file</a>
				</div>
			</div> 
		</section>


		<section class="pp-sponsors">
			<h2>Made possible by:</h2>
			<ul>
				<!-- <li v-for="sponsor in data.meta_box._page_grant_sponsors" :key="sponsor['_page_g_sponsor_img']">
					<a :href="sponsor['_page_g_sponsor_link']" target="_blank"><img :src="sponsor['_page_g_sponsor_img']" alt="logo"></a>
				</li>  -->
				<li>
					<p>Founding Sponsor</p>
					<img src="https://parkpeople.ca/listings/custom/uploads/2018/05/TO_logo_white.png" alt="Toronto Logo">
				</li>
				<li class="second-sponsor">
					<img src="src/assets/metroland_logo.jpg" alt="">
				</li>
				<li>

				</li>
			</ul>
		</section>

		<section class="event-templates">
			<h2 v-html="data.meta_box._page_tri_section[1]._page_tri_section_heading"></h2>
			<div class="three-column fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s">
				<div v-for="bucket in data.meta_box._page_tri_section[1]._page_triple" :key="bucket.bucket_copy">
					<h3 v-html="bucket._page_tri_heading"></h3>
					<!-- <p v-html="bucket._page_tri_copy"></p> -->
					<a :href="bucket._page_tri_button_link" @click="downloadArea(bucket._page_tri_heading)" v-html="bucket._page_tri_button_text"></a>
				</div>
			</div> 
		</section>

		<section class="grants-newsletter">
			<div class="container">
				<p>Want to stay up-to-date on Park People news?</p>
				<a class="" href="http://parkpeople.us2.list-manage.com/subscribe?u=ba963c8c64482c0ad756245c3&id=efc9b053b8" target="_blank">Get the Park People newsletter!</a>
			</div>
		</section>
		
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
	max-width: 80%;
	left: calc(10%);
	top: calc(45% - 150px);
	h1 {
		font-size: 60px;
	}
}

.map-section {
	margin-top: -250px;
}

.herosearch > input[type="text"]{
        font-family: "Comfortaa";
        width: 30rem;
        margin-top: 2rem;
        font-size: 24px;
        border:0;
        background-color: rgba(255,255,255,0.1);
        
        background-image: url(https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png);
        background-size: 3.5rem;
        background-position: right;
        background-repeat: no-repeat;
        padding: 1rem;
        border-radius: 1rem;
        color: #fff;
    }
    .herosearch > input[type="submit"]{
        vertical-align: baseline;
        transform: translate(-200%,0);
        background: transparent;
        border: 0;
        margin: 0;
        padding: 0;
        font-size: 2rem;
        font-family: sans-serif;
        color: orangered;
    }
    .herosearch>*:focus{
        outline: 0;
        box-shadow: 0 0 2pt 0pt white;
    }

</style>