<template>
    <div style="position: relative;background-image: url(https://parkpeople.ca/listings/custom/uploads/2018/05/stars_REPEATABLE_SWTACH.jpg);background-repeat: repeat;">
        <app-header></app-header>
        <transition name="fade">
            <router-view :key="$route.fullPath"></router-view>
        </transition>
        <app-footer></app-footer>
        <div class="credits">
            <div class="container">
                <p>Made with <i class="fa fa-heart" aria-hidden="true"></i> by <a href="https://hypenotic.com" target="_blank">Hypenotic</a>.</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from './components/Header.vue';
    import Footer from './components/Footer.vue';
    import { mapState } from 'vuex';
    export default {
    components: {
        appHeader: Header,
        appFooter: Footer
    },
    mounted: function() {
        this.$store.dispatch("getLocations", {'type': 'initial-load'});
        this.$store.dispatch("getActivities", {'type': 'initial-load'});
    },
    created: function() {
        
    },
}
</script>

<style lang="scss">
    /* ----- defs */
    
    @keyframes twinkle{
        0%{
            background: 100% 0% url(assets/twinkling.png);
        }
        50%{
            background: 50% 0% url(assets/twinkling.png);
        }
        100%{
            background: 0% 0% url(assets/twinkling.png);
        }
    }

    /* ----- resets */

    *{
        box-sizing: border-box;
    }

    html, body{
        margin:0;
        padding:0;
        border:0;
    }
    
    html, body, #app{
        height: 100%;
    }

    /* ----- font business and setup */

    @media (orientation:landscape){
        *{

        }
        html{
            // font-size: calc(0.9vw);
        }
        .col-2{
            display: grid;
            grid-template-columns: [left] 50% [right] 50% [end] 0;
        }

        .col-3{
            display: grid;
            grid-template-columns: [lg] auto [left] 25% [mid] 25% [right] 25% [rg] auto [end] 0;
        }

        .full{
            height: 100%;
        }
    }

    @media (orientation:portrait){
        *{

        }
        html{
            font-size: calc(0.7vw + 4pt);
        }
        .full{
            height: auto;
            padding: 10rem 0 15rem 0;
        }

        .col-2, .col-2 > *, .col-3, .col-3 > *{
            display: block;
        }

        .col-2 > *, .col-3 > *{
            height: 50%;
        }
    }


    body{
        font-family: "Comfortaa";
        position: relative;
        color: #d3d1cd;
        background: #001f62;
    }

    a{
        text-decoration: none;
    }

    a.but{
        border-radius: 2rem;
        border: 2px solid #e1ba44;
        color: #e1ba44;
        background: transparent;
    }

    a.but:hover{
        background: #e1ba44;
        color: #fff;
        border: 2px solid #e1ba44;
    }

    section{
        font-size: 2rem;
    }

    .heading{
        font-size: 3rem;
    }

    .center{
        width: 100%;
        text-align: center;
    }

    .copy{
        width: 70%;
    }

    .middle{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .full{
        width: 100%;
    }

    .full > .fi{
        width: 80%;
        margin: auto;
    }

    /* ----- general blocks */

    /* nav */

    nav{
        letter-spacing: 1.15;
        font-size: 2vh;
        position: absolute;
        width: 100%;
        z-index: 100;
        font-family: "Dosis";
        padding: 1rem;
        display: flex;
        justify-content: space-between;
    }



    nav img{
        position: relative;
        height: 3.5vmin;
        vertical-align: middle;
    }
    
    .navinner{
        display: flex;
        align-items: center;
    }

    .navinner > *{
        padding: 0.5vmin 1.5vmin;
        display: flex;
        align-items: center;
    }

    #ni2{
        justify-content: flex-end;
    }

    #lang span{
        padding: 0 0.25rem;
    }

    #lang span:not(.sel){
        color: #aaa;
    }

    /* hero */
    #banner{
        position: absolute;
        background: no-repeat top/100% 20vh url(assets/gradient.png), no-repeat bottom/100% url(assets/bannerbase.png);
        bottom:0;
        z-index: 50;
    }
    
    #stars{
        width: 150%;
        height: 100%;
        z-index: 60;
        background: 0% 0% / 10% url(assets/stars.png);
        mix-blend-mode: screen;
        position: absolute;
        right:0;
        bottom: 0;
        transform: rotate(4.5deg);
        transform-origin: 100% 100%;
    }
    
    .twinkle{
        width: 100%;
        height: 100%;
        z-index: 60;
        position: absolute;
        animation: twinkle 240s infinite linear;
    }
    
    #moon{
        position: absolute;
        width: 40rem;
        right: 3rem;
        top: 25%;
        z-index: 75;
    }
    
    #hero{
        /* maybe make this fluid later */
        margin-bottom: -10%;
        background: no-repeat bottom/100% url(assets/bannerpeople.png);
        display: flex;
        flex-direction: column;
        justify-content: center;
        z-index: 100;
        position: relative;
        letter-spacing: 1.1;
        height:100%;
    }

    .herosearch > input[type="text"]{
        font-family: "Comfortaa";
        width: 30rem;
        margin-top: 2rem;
        font-size: 2rem;
        border:0;
        background-color: rgba(255,255,255,0.1);
        /*
        background-image: url(https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png);
        background-size: 3.5rem;
        background-position: right;
        background-repeat: no-repeat;
        */
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

    #hero .blurb{
        font-size: 6rem;
        font-family: "Oswald";
        text-transform: uppercase;
        line-height: 1.1;
        text-shadow: 1px 3px 1px rgba(255,255,255,0.2);
    }

    #hero .blurb p{
        margin: 0;
    }

    /* map */

    #map{
        height: 100%;
    }

    /* media */

    #media{
        font-size: 0;
    }

    #media video{
        width: 100%;
        height: 100%;
    }

    /* howto */
    /* tips */

    #tips .col-3 > :first-child{
        grid-column: left;
    }

    /* partners */

    #partners{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    /* promo */

    #promo > :first-child{
        grid-column: left;
    }

    /* cta */

    #cta{
        height: 50%;
    }

    /* footer */
    
</style>