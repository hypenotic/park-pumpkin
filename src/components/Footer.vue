<template>
    <div>  
        <footer v-if="this.$route.path == '/grant-recipients'">
            <div>
                <div class="columns">
                    <div class="column is-6 left-side">
                        <div class="columns is-centered">
                            <div class="column is-4">
                                <!-- <p>Founding Sponsor</p> -->
                                <a href="" target="_blank"><img src=""></a>
                            </div>
                        </div>
                    </div>
                    <div class="column is-6" style="background-color: green; color: white;">
                        <div class="columns">
                            <div class="column is-6">
                                <ul>
                                    <li style="color: white;font-weight: bold;">Park People</li>
                                    <li>401 Richmond Street West</li>
                                    <li>Studio 119, City Builder’s Lab</li>
                                    <li>Toronto, ON M5V 3A8</li>
                                </ul>
                                <ul class="details">
                                    <li>Phone: <a href="tel:+14165835776">416-583-5776</a></li>
                                    <li>Email: <a href="mailto:info@parkpeople.ca">info@parkpeople.ca</a></li>
                                    <li>Charity #: 846449437RR0001</li>
                                </ul>
                                <ul class="social-links">
                                    <li><a href="https://parkpeople.ca/" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                                    <li><a href="https://twitter.com/Park_People" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                                    <li><a href="https://www.facebook.com/ParkPeopleCA/" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                                </ul>
    
                            </div>
                            <div class="column is-6">
                                <a class="button" href="https://parkpeople.ca/donate-now" target="_blank">Donate</a>
                            </div>
    
                        </div>
                    </div>
                </div>
            </div>
        </footer> 
        <footer v-else class="foot">
            <div>
                <div class="columns">
                    <div class="column is-6 left-side">
                        <div class="columns is-centered">
                            <div class="column is-6">
                                <!-- <p>Founding Sponsor</p> -->
                                <a href="" target="_blank"><img src=""></a>
                            </div>
                        </div>
                    </div>
                    <div class="column is-6" style="background-color: black; color: white;">
                        <div class="columns">
                            <div class="column is-6">
                                <ul>
                                    <li style="color: white;font-weight: bold;">Park People</li>
                                    <li>401 Richmond Street West</li>
                                    <li>Studio 119, City Builder’s Lab</li>
                                    <li>Toronto, ON M5V 3A8</li>
                                </ul>
                                <ul class="details">
                                    <li>Phone: <a href="tel:+14165835776">416-583-5776</a></li>
                                    <li>Email: <a href="mailto:info@parkpeople.ca">info@parkpeople.ca</a></li>
                                    <li>Charity #: 846449437RR0001</li>
                                </ul>
                                <ul class="social-links">
                                    <li><a href="https://parkpeople.ca/" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                                    <li><a href="https://twitter.com/Park_People" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                                    <li><a href="https://www.facebook.com/ParkPeopleCA/" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                                </ul>
    
                            </div>
                            <div class="column is-6">
                                <a class="button" href="https://parkpeople.ca/donate-now" target="_blank">Donate</a>
                            </div>
    
                        </div>
                    </div>
                </div>
            </div>
        </footer> 
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

    // Import Variables
    @import '../styles/variables.scss';

    .button {
        color: $white;
        background-color: $blue;
        font-family: $family-sanserif;
        font-weight: bold;
        border: 2px solid $blue;
        border-radius: 50px;
        padding: 8px 24px;
        &:hover {
            border: 2px solid $blue;
            background-color: $white;
            color: $blue; 
        }
    }

    footer {
        font-size: 16px;
        @media #{$medium-and-up} {
			font-size: 0.8rem;
		}
        p, ul, li {
            font-size: 16px;
            @media #{$medium-and-up} {
                font-size: 0.8rem;
            }
        }
        ul + ul {
            margin-top: 16px;
        }
    }

    footer {
        position: relative;
        padding-top: 100px;
        @media #{$medium-and-up} {
			 padding-top: 150px;
		}
        > div {
            position: relative;
            &:before {
                content: '';
                position: absolute;
                left: 0;
                top: -70px;
                width: 100%;
                height: 160px;
                background: #fff;
                // background-image: url('https://parkpeople.ca/listings/custom/uploads/2018/05/stars_REPEATABLE_SWTACH.jpg');
                -webkit-transform: skewY(5deg);
                -moz-transform: skewY(5deg);
                -ms-transform: skewY(5deg);
                -o-transform: skewY(5deg);
                transform: skewY(5deg);
                -webkit-backface-visibility: hidden;
            }
        }
    }

    footer.footer-grants {
        position: relative;
        padding-top: 60px;
        > div {
            position: relative;
            &:before {
                content: '';
                position: absolute;
                left: 0;
                top: -70px;
                width: 100%;
                height: 160px;
                background: #eee;
                @media #{$large-and-up} {
                    -webkit-transform: skewY(5deg);
                    -moz-transform: skewY(5deg);
                    -ms-transform: skewY(5deg);
                    -o-transform: skewY(5deg);
                    transform: skewY(5deg);
                }
                @media #{$xlarge-and-up} {
                    -webkit-transform: skewY(3deg);
                    -moz-transform: skewY(3deg);
                    -ms-transform: skewY(3deg);
                    -o-transform: skewY(3deg);
                    transform: skewY(3deg);
                }
                @media #{$medium-and-down}{
                    width: 0;
                    height: 0;
                    background:transparent;
                }
            }
        }
    }

    footer >div >div >div {
        padding-top: 80px;
        padding-left: 40px;
        padding-right: 40px;
        @media #{$medium-and-up} {
           padding-top: 200px;
        }
    }
    footer >div >div >div:first-child {
        background: rgb(249, 249, 249);
    }
    footer >div >div >div:last-child {
        padding: 40px;
        @media #{$medium-and-up} {
            padding: 200px 80px 80px;
        }
    }

    footer img {
        max-height: 300px;
        width: auto;
        max-width: 300px;
        padding-top: 0px;
    }

    .social-links {
        li {
            display: inline-block;
            a {
                color: white;
                &:hover {
                    opacity: 0.6;
                }
            }
            i {
                font-size: 32px;
            }
        }
        li + li {
            margin-left: 16px;
        }
    }
    .details a {
        color: white;
        text-decoration: underline;
        &:hover {
            text-decoration: none;
        }
    }

    .column.is-6.left-side {
        background-image: url('https://parkpeople.ca/listings/custom/uploads/2018/06/footer_image_pumpkin.jpg');
        background-size: cover;
    }
</style>