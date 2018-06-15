<template>
    <nav v-if="scrolled == true" id="scrolling" class="navbar">
        <div class="navbar-brand">
            <div>
                <a href="https://parkpeople.ca/pumpkinparades"><img src="src/assets/pplogo.png" class="grants-logo"></a>
            </div>
        </div>

        <!-- <div class="lang">
            <a v-if="this.$route.path == '/faq'" href="https://parkpeople.ca/boursesdeparc/faq">FR</a>
            <a v-else href="https://parkpeople.ca/boursesdeparc">FR</a>
        </div> -->

        <div class="social-header">
            <ul>
                <li><a href="https://parkpeople.ca/" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                <li><a href="https://twitter.com/Park_People" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                <li><a href="https://www.facebook.com/ParkPeopleTO/" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
            </ul>
        </div>

         <div id="mobile-menu-trigger" v-on:click="showMobileMenu = !showMobileMenu">
            <i class="fa fa-bars" aria-hidden="true"></i>
        </div>

        <div id="navbarExampleTransparentExample" class="navbar-menu" v-bind:class="{ 'menu-open': showMobileMenu }">
            <div class="navbar-end">
                <a href="https://parkpeople.ca/listings" class="navigation-register">Create/Register a group</a>
                <a class="park-logo" href="https://parkpeople.ca"><img src="src/assets/parkpeople.png" alt=""></a>
            </div>
        </div>
    </nav>
    <nav v-else class="navbar ">
        <div class="navbar-brand">
            <div>
                <a href="https://parkpeople.ca/pumpkinparades"><img src="src/assets/pplogo.png" class="grants-logo"></a>
            </div>
        </div>

        <!-- <div class="lang">
            <a v-if="this.$route.path == '/faq'" href="https://parkpeople.ca/boursesdeparc/faq">FR</a>
            <a v-else href="https://parkpeople.ca/boursesdeparc">FR</a>
        </div> -->

        <div class="social-header">
            <ul>
                <li><a href="https://parkpeople.ca/" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                <li><a href="https://twitter.com/Park_People" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                <li><a href="https://www.facebook.com/ParkPeopleTO/" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
            </ul>
        </div>

         <div id="mobile-menu-trigger" v-on:click="showMobileMenu = !showMobileMenu">
            <i class="fa fa-bars" aria-hidden="true"></i>
        </div>

        <div id="navbarExampleTransparentExample" class="navbar-menu" v-bind:class="{ 'menu-open': showMobileMenu }">
            <div class="navbar-end">
                <div class="lang">
                    <a v-if="this.$route.path == '/faq'" href="https://parkpeople.ca/boursesdeparc/faq">FR</a>
                    <a v-else href="https://parkpeople.ca/boursesdeparc">FR</a>
                </div>
                <a href="https://parkpeople.ca/listings" class="navigation-register">Create/Register a group</a>
                <a href="https://parkpeople.ca" class="navbar-item park-logo"><img src="src/assets/parkpeople.png" alt=""></a>
                <!-- <span class="navbar-item" v-on:click="showMobileMenu = !showMobileMenu" v-if="this.$route.path == '/grant-recipients'"><router-link to="/" exact>Back to Grants Page</router-link></span>
                <span class="navbar-item" v-on:click="showMobileMenu = !showMobileMenu" v-if="this.$route.path == '/'"><router-link to="/grant-recipients" exact>2018 Recipients</router-link></span> -->
            </div>
        </div>
    </nav>
</template>

<script>
import { eventBus } from '../main.js';
export default {
    data() {
        return {
            id: this.$route.params.id,
            lang: '',
            showMobileMenu: false,
            scrolled: false
        }
    },
    methods: {
        handleScroll: function (event) {
            if (window.addEventListener){
                // console.log('A');
                // console.log(pageYOffset);
                if (window.pageYOffset > 20) {
                    this.scrolled = true;
                } else {
                    this.scrolled = false;	
                }
            } else if (window.attachEvent){
                // console.log('B');
                if (window.scrollY > 20) {
                    this.scrolled = true;
                } else {
                    this.scrolled = false;	
                }
            } else {
                if (window.pageYOffset > 20) {
                    // console.log('C');
                    this.scrolled = true;
                } else {
                    this.scrolled = false;	
                }
            }
        }
    },
    created: function () {
        // window.addEventListener('scroll', this.handleScroll);
        if (window.addEventListener){
            // console.log('Option 1');
            window.addEventListener('scroll', this.handleScroll);
        } else if (window.attachEvent){
            // console.log('Option 2');
            window.attachEvent('scroll', this.handleScroll);
        } else {
            // console.log('Option 3');
            jQuery(window).on('scroll', this.handleScroll);
            // console.log('IE');
        }
    },
    destroyed: function () {
        // window.removeEventListener('scroll', this.handleScroll);
        if (window.addEventListener){
            window.removeEventListener('scroll', this.handleScroll);
        } else if (window.attachEvent){
            window.detachEvent('scroll', this.handleScroll);
        } else {
            window.removeEventListener('scroll', this.handleScroll);
        }
    }
};
</script>

<style lang="scss" scoped>

@import '../styles/variables.scss';
@import '../styles/components/nav.scss';


.social-header {
    ul {
        display: flex;
        li {
            margin: 0 8px;
            a {
                font-size: 24px;
            }
        }
    }
}

.navigation-register {
	border: 1px solid #E1BA44;
	background: transparent;
	color: #E1BA44 !important;
    padding: 16px 24px;
    height: auto;
	display: inline-block;
	// margin-top: 24px;
	border-radius: 50px;
	font-size: 18px;
	line-height: 1;
    font-family: 'Dosis';
    min-height: auto;
	&:hover {
		background: $white;
		color: $orange;
	}
}

.navbar-menu .park-logo {
    &:hover {
        background: transparent;
    }
}


</style>