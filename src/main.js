import Vue from 'vue'
// import Vuex from 'vuex'
import store from './store'
import App from './App.vue'
// After install add Vue Router to our main app
import VueRouter from 'vue-router'
import VueAnalytics from 'vue-analytics'
import { routes } from './routes'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
var SocialSharing = require('vue-social-sharing');
import VuePaginate from 'vue-paginate'


export const eventBus = new Vue();

// Use
Vue.use(Buefy);
Vue.use(SocialSharing);
Vue.use(VuePaginate)
// Vue.use(Vuex);

/* With the Vue Router imported 
we can then tell the app to use it */
Vue.use(VueRouter);

// const store = new Vuex.Store({
//   state: {
//     resourceList: []
//   },
//   mutations: {
    
//   }
// })

const router = new VueRouter({
	routes, // Have to pass an object where we setup the router. ES6 syntax (routes:routes)
  	mode: 'history', // Remove the hash
  	base: '/parades',
  	scrollBehavior (to, from, savedPosition) {
		if (to.hash) {
			console.log('HASH');
			return {
			selector: to.hash
			, offset: { x: 0, y: 100 }
			}
		} else {
			return { x: 0, y: 0 }
		}
	}
})

Vue.use(VueAnalytics, {
	id: 'UA-73699301-1',
	// commands: {
	// 	trackClick (name = 'unknown') {
	// 	   $ga.track('Social Link', 'click', 'Social Account', name)
	// 	}
	// }
	// debug: {
	// 	enabled: true,
	// 	trace: false,
	// 	sendHitTask: true
	// },
	router
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
