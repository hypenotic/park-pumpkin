<template>
     <div class="single-list-item">
        <div class="single-list-item-container active-event" v-if="item.timeframe !== 'past'">
            <div class="single-list-item__image">
                <img :src="item.image" :alt="item.title">
            </div>

            <div class="card-content">
                <h5>
                    <a :href="'https://parkpeople.ca/listings/events/?n='+ item.slug+ '&id='+ item.id+'&pumpkin=true'" target="_blank" v-html="item.title" v-if="item.timeframe !== 'past'"></a>
                    <span v-html="item.title" v-if="item.timeframe == 'past'"></span>
                </h5>
                
                <p class="single-list__group" v-if="item.listing[1] !== 'Title'"><i class="fa fa-users"></i> <a :href="'https://parkpeople.ca/listings/groups/?n='+item.listing[2]+'&id='+item.listing[0]+'&pumpkin=true'" target="_blank"><span v-html="item.listing[1]"></span></a></p>
    
                <p class="single-list__date"><i class="fa fa-calendar-o" aria-hidden="true"></i> <span v-html="item.nice_start_date"></span></p>
    
                <p class="single-list__time"><i class="fa fa-clock-o" aria-hidden="true"></i> <span v-html="item.start_time + ' - ' + item.end_time"></span></p>
                
                <p class="single-list__location"><i class="fa fa-map-marker" aria-hidden="true"></i> <span v-html="item.address"></span></p>
            </div>
        </div>
        <div v-else class="single-list-item-container">
            <div class="single-list-item__image ">
                <img :src="item.image" :alt="item.title">
            </div>

            <div class="card-content">
                <h5>
                    <a :href="'https://parkpeople.ca/listings/events/?n='+ item.slug+ '&id='+ item.id+'&tdgrant=true'" target="_blank" v-html="item.title" v-if="item.timeframe !== 'past'"></a>
                    <span v-html="item.title" v-if="item.timeframe == 'past'"></span>
                </h5>
                
                <p class="single-list__group" v-if="item.listing[1] !== 'Title'"><i class="fa fa-users"></i> <a :href="'https://parkpeople.ca/listings/groups/?n='+item.listing[2]+'&id='+item.listing[0]+'&tdgrant=true'" target="_blank"><span v-html="item.listing[1]"></span></a></p>
    
                <p class="single-list__date"><i class="fa fa-calendar-o" aria-hidden="true"></i> <span v-html="item.nice_start_date"></span></p>
    
                <p class="single-list__time"><i class="fa fa-clock-o" aria-hidden="true"></i> <span v-html="item.start_time + ' - ' + item.end_time"></span></p>
                
                <p class="single-list__location"><i class="fa fa-map-marker" aria-hidden="true"></i> <span v-html="item.address"></span></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['item'],
        data() {
            return {
            }
        },
        mounted() {
        },
        methods: { 
        },
        computed: {
        },
    }
</script>

<style lang="scss" scoped>

@import '../../styles/variables.scss';

.single-list-item {
    color: rgba(0,0,0,0.74);
    h5 {
        font-size: 18px;
        line-height: 1.3;
        margin: 0;
        margin: 8px 0 12px;
        font-weight: bold;
        &:hover {
            a {
                color: rgb(2, 33, 95);
            } 
        }
    }
    a {
        &:hover {
            color: rgb(2, 33, 95);
        }
    }
}

.single-list-item-container {
    display: block;
    transition: all 0.2s ease;
    margin: 24px;
    border-radius: 8px;
    p {
        margin: 0;
        font-size: 14px;
        line-height: 1.3;
        padding-bottom: 8px;
    }
}

.single-list-item-container.active-event {
    &:hover {
        transform: scale(1.01) rotate(1deg);
        box-shadow: 0 5px 10px rgba(10, 10, 10, 0.3), 0 0 0 1px rgba(10, 10, 10, 0.1);
        // h5 {
        //     a {
        //         color: lighten($blue, 10);
        //     } 
        // }
	}
}


.card-content {
    border-bottom-left-radius: 8px;
	border-bottom-right-radius: 8px;
    background: $white;
    padding: 16px 24px;
    i {
        // color: $orange;
        margin-right: 8px;
    }
}

.single-list-item__image {
    height: 150px;
    width: 100%;
    img {
        object-fit: cover;
        display: block;
        width: 100%;
        height: 100%;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
}

.single-list__group,
.single-list__location
 {
    display: flex;
}

.single-list__location {
    i {
        margin-right: 15px;
        font-size: 18px;
    }
}

.single-list__group {
    i {
        margin-right: 12px;
    }
}


</style>
