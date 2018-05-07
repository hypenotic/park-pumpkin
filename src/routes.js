/* need to import the components for the 
route*/
import Grants from './views/Grants.vue';
import Single from './views/Single.vue';

/* export a const names routes with will 
hold my routes. Holding routes means it has 
an array which has objects which represent a route.
*/

export const routes = [
	/*path will be appended to URL,
	then need the component to load*/
	{ path:'/', component: Grants, props: true },
	{ path:'/grants', component: Grants, props: true },
	{ path:'/faq', component: Single, props: true },
	{ path:'/grant-recipients', component: Single, props: true },
	{ path: '*', redirect: '/' }
]