<template>
	<div v-if="data != null">
		<!-- <section id="banner" class="full">
        </section>
        <div id="stars">
            <div class="twinkle">
            </div>
        </div>
        <img id="moon" src="src/assets/moon.png">
        <section id="hero" class="full">
            <div class="fi">
                <div class="blurb">
                    <h1 v-html="data.meta_box._page_grant_heading"></h1>
                </div>
                <div>
                    <form class="herosearch">
                        <input type="text" name="findnear" placeholder="Find a parade near you">
                        <input type="submit" value="🔍︎">
                    </form>
                </div>
            </div>
        </section> -->
		
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
							<iframe src="//www.youtube.com/embed/8kOzSzmx-kE" allowfullscreen></iframe>
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

		<!-- <section class="more-info">
			<div class="container">
				<h2>Simple Steps to Planning Your Pumpkin Parade</h2>
				<div class="topContent" v-html="data.meta_box._page_grant_more_info"></div>
			</div>
		</section> -->

		<section class="event-templates event-templates--top">
			<div class="event-templates__grad-container">
				<div class="event-templates__container">
					<h2 v-html="data.meta_box._page_tri_section[0]._page_tri_section_heading"></h2>
					<div class="three-column fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s">
						<div v-for="bucket in data.meta_box._page_tri_section[0]._page_triple" :key="bucket.bucket_copy">
							<h3 v-html="bucket._page_tri_heading"></h3>
							<p v-html="bucket._page_tri_copy"></p>
							<a :href="bucket._page_tri_button_link" @click="downloadArea(bucket._page_tri_heading)">Download .zip file</a>
						</div>
					</div> 
				</div>
			</div>
		</section>

		<section class="event-templates event-templates--top">
			<div class="">
				<div class="event-templates__container">
					<h2>Resources and Blog Posts</h2>
					<div class="three-column fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s">
						<div class="three-column__single">
							<h3>Tips to make your pumpkin parade shine</h3>
							<p>Pumpkin Parades are simple, but there are a few things you should know before hosting your first one.</p>
							<a href="https://parkpeople.ca/resources/en/resource/551/tips-to-make-your-pumpkin-parade-shine" target="_blank">View resource</a>
						</div>
						<div class="three-column__single">
							<h3>Pumpkin Parades</h3>
							<p>Pumpkin Parades involve bringing all of the community jack-o-lanterns to the park to create a magical gallery of pumpkins for the neighbourhood to enjoy. They’re simple to execute and are growning in popularity. Find out why.</p>
							<a href="https://parkpeople.ca/resources/en/resource/449/pumpkin-parade" target="_blank">View resource</a>
						</div>
						<div class="three-column__single">
							<h3>Pumpkin Parade Founder gets to the core of her love of pumpkins</h3>
							<p>Yes, Pumpkin Parades are a Toronto-born cultural phenomenon. But, do you know the woman behind this great tradition?</p>
							<a href="https://parkpeople.ca/archives/9626" target="_blank">View blog post</a>
						</div>
						<div class="three-column__single">
							<h3>Ottawa spreads Pumpkin Parade celebrations</h3>
							<p>We spoke with Anita Grace, who brought the parades to Ottawa to get the scoop on what it’s been like bringing the Halloween after-party to her city.</p>
							<a href="https://parkpeople.ca/archives/9633" target="_blank">View blog post</a>
						</div>
						<div class="three-column__single">
							<h3>You don’t need to celebrate halloween to love pumpkin parades</h3>
							<p>Clara Stewart Robertson brought a Pumpkin Parade to her neighbourhood. And in her neighbourhood Pumpkin Parades thrived, even without Halloween.</p>
							<a href="https://parkpeople.ca/archives/9641" target="_blank">View blog post</a>
						</div>
					</div> 
				</div>
			</div>
		</section>

		<section class="grants-newsletter">
			<div class="container">
				<p>Want to stay up-to-date on Park People news?</p>
				<a class="" href="http://eepurl.com/dx3BWX" target="_blank">Get the Park People newsletter!</a>
			</div>
		</section>

		<section class="pp-sponsors">
			<h2>Made possible by a great collaboration:</h2>
			<ul>
				<!-- <li v-for="sponsor in data.meta_box._page_grant_sponsors" :key="sponsor['_page_g_sponsor_img']">
					<a :href="sponsor['_page_g_sponsor_link']" target="_blank"><img :src="sponsor['_page_g_sponsor_img']" alt="logo"></a>
				</li>  -->
				<li>
					<img src="https://parkpeople.ca/listings/custom/uploads/2018/06/TO_logo_black.png" alt="Toronto Logo">
					<img src="https://parkpeople.ca/listings/custom/uploads/2018/04/pp_logo_large.png" alt="Park People Logo">
				</li>
				<li class="second-sponsor">
					<p>Media Sponsor</p>
					<img src="src/assets/metroland_logo.jpg" alt="">
				</li>
				<li>

				</li>
			</ul>
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
	
/* hero */
// .full{
// 	width: 100%;
// }


// .full > .fi{
// 	width: 80%;
// 	margin: auto;
// }

// #banner{
// 	position: absolute;
// 	// background: no-repeat top/100% 20vh url(../assets/gradient.png), no-repeat bottom/100% url(../assets/bannerbase.png);
// 	bottom:0;
// 	z-index: 50;
// }

// #stars{
// 	width: 150%;
// 	height: 100%;
// 	z-index: 60;
// 	background: 0% 0% / 10% url(../assets/stars.png);
// 	mix-blend-mode: screen;
// 	position: absolute;
// 	right:0;
// 	bottom: 0;
// 	transform: rotate(4.5deg);
// 	transform-origin: 100% 100%;
// }

// .twinkle{
// 	width: 100%;
// 	height: 100%;
// 	z-index: 60;
// 	position: absolute;
// 	animation: twinkle 240s infinite linear;
// }

// #moon{
// 	position: absolute;
// 	width: 40rem;
// 	right: 3rem;
// 	top: 25vh;
// 	z-index: 75;
// }

// #hero{
// 	/* maybe make this fluid later */
// 	margin-bottom: -10%;
// 	background: no-repeat bottom/100% url(../assets/bannerpeople.png);
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: center;
// 	z-index: 100;
// 	position: relative;
// 	letter-spacing: 1.1;
// 	height:100vh;
// }

// .herosearch > input[type="text"]{
// 	font-family: "Comfortaa";
// 	width: 30rem;
// 	margin-top: 2rem;
// 	font-size: 2rem;
// 	border:0;
// 	background-color: rgba(255,255,255,0.1);
// 	/*
// 	background-image: url(https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png);
// 	background-size: 3.5rem;
// 	background-position: right;
// 	background-repeat: no-repeat;
// 	*/
// 	padding: 1rem;
// 	border-radius: 1rem;
// 	color: #fff;
// }

// .herosearch > input[type="submit"]{
// 	vertical-align: baseline;
// 	transform: translate(-200%,0);
// 	background: transparent;
// 	border: 0;
// 	margin: 0;
// 	padding: 0;
// 	font-size: 2rem;
// 	font-family: sans-serif;
// 	color: orangered;
// }

// .herosearch>*:focus{
// 	outline: 0;
// 	box-shadow: 0 0 2pt 0pt white;
// }

// #hero .blurb{
// 	font-size: 6rem;
// 	font-family: "Oswald";
// 	text-transform: uppercase;
// 	line-height: 1.1;
// 	text-shadow: 1px 3px 1px rgba(255,255,255,0.2);
// }

// #hero .blurb p{
// 	margin: 0;
// }
</style>