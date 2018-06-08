<template>
    <div id="app">
        <nav>
            <div class="navinner" id="ni1">
                <div id="home">
                    <a href="#">
                        <img src="src/assets/pplogo.png">
                    </a>
                </div>
                <div id="social">
                    ig t f
                </div>
            </div>
            <div class="navinner" id="ni2">
                <div id="lang">
                    <span class="sel">En</span><span>Fr</span>
                </div>
                <a href="" id="register" class="but">
                            Create/register a group
            </a>
                <div id="logo">
                    <a href="http://parkpeople.ca">
                        <img src="src/assets/parkpeople.png">                
                    </a>
                </div>
            </div>
        </nav>
        <section id="banner" class="full">
        </section>
        <img id="moon" src="src/assets/moon.png">
        <section id="hero" class="full">
            <div class="fi">
                <div class="blurb">
                    <p>
                        <span v-html="page.meta_box._page_phero_heading"></span>
                    </p>
                    <p>
                        <span v-html="page.meta_box._page_phero_copy"></span>
                    </p>
                </div>
                <div>
                    <form class="herosearch">
                        <input type="text" name="findnear" placeholder="Find a parade near you">
                        <input type="submit" value="🔍︎">
                    </form>
                </div>
            </div>
        </section>
        <app-map></app-map>
        <section id="media" class="col-2">
            <div>
                <video controls>
                    <source :src="page.meta_box._page_pmedia_video" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
            <div>
                <img :src="page.meta_box._page_pmedia_image">
            </div>
        </section>
        <section id="howto" class="full middle">
            <div class="heading center">
                Simple Steps to Planning Your Pumpkin Parade
            </div>
            <div class="copy">
                there is more text here apparently, there is more text here apparently, there is more text here apparently, there is more text here apparently, there is more text here apparently, there is more text here apparently, there is more text here apparently, there is more text here apparently, there is more text here apparently, there is more text here apparently, there is more text here apparently, there is more text here apparently, there is more text here apparently,
            </div>
        </section>
        <section id="tips" class="full middle">
            <div class="heading center">
                THis is a heading
            </div>
            <div class="center">
                some subtext
            </div>
            <div class="col-3">
                <div>
                    nice
                </div>
                <div>
                    cool
                </div>
                <div>
                    thing
                </div>
            </div>
        </section>
        <section id="partners">
            <div>
                sponsored by people
            </div>
            <div>
                torono
            </div>
            <div>
                metro
            </div>
        </section>
        <section id="promo" class="col-3">
            <div>
                nice
            </div>
            <div>
                cool
            </div>
            <div>
                thing
            </div>
        </section>
        <section id="cta">
            click a shiny button
        </section>
        <section id="footer" class="col-2">
            <div>
                cool picture
            </div>
            <div>
                contact info
            </div>
        </section>
    </div>
</template>

<script>
    import store from './store';
    import Map from './components/map/Map.vue';

    export default {
        components: {
            appMap: Map
        },
        store,
        data(){
            return {
            }
        },
        computed:{
            count(){
                return store.state.count
            },
            page(){
                return store.state.page
            }
        },
        created() {
            this.$store.dispatch('GET_PAGE');
        },
        methods: {
            increment () {
                store.commit('increment')
            },
            decrement () {
                store.commit('decrement')
            }
        }
    }
</script>

<style lang="scss">
    

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
            font-size: calc(0.9vw);
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
        background: url(assets/stars.jpg);
        background-size: 25%;
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
        background: no-repeat bottom/100% url(assets/bannerbase.png);
        bottom:0;
        z-index: 50;
    }
    
    #moon{
        position: absolute;
        width: 40rem;
        right: 3rem;
        top: 25%;
        z-index: 50;
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