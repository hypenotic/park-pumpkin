<template>
    <section class="map-list">
        <h3>Parades</h3>
        <div class="map-list-container" v-if="activeMarkers.length == 0">
            <!-- <div class="empty-message" v-if="activeMarkers.length == 0">No events match your search.</div> -->
            <app-card v-for="item in locations" :key="item.id" v-if="item.timeframe != 'past'" :item="item"></app-card>
        </div>
        <div class="map-list-container" v-else>
            <!-- <div class="empty-message" v-if="activeMarkers.length == 0">No events match your search.</div> -->
            <app-card v-for="item in activeMarkers" :key="item.id" v-if="item.timeframe != 'past'" :item="item"></app-card>
        </div>
    </section>
</template>

<script>
    import MapListCard from './MapListCard.vue';
    export default {
        components: {
            appCard: MapListCard
        },
        data() {
            return {
            }
        },
        mounted() {
            this.upcomingCount;
        },
        methods: { 
        },
        computed: {
            locations(){
                return this.$store.getters.allLocations;
            },
            activeMarkers(){
                return this.$store.getters.allActiveEvents;
            },
            // upcomingCount(){
            //     let upcoming = 0;
            //     for( var i = 0; i < this.$store.state.locationList; i++ ){
            //         if (this.$store.state.locationList[i].timeframe != 'past') {
            //             console.log(this.$store.state.locationList[i].timeframe);
            //             upcoming++;
            //         }
            //     }
            //     console.log(upcoming);
            //     return upcoming;
            // }
        },
    }
</script>

<style lang="scss" scoped>

@import '../../styles/variables.scss';

.map-list {
	background: $white;
    background-color: rgba(2, 33, 95, 1);
    padding-top: 150px;
}

.map-list {
    transition: all 0.5s ease;
    width: 0%;
    display: inline-block;
    height: 0;
    overflow: hidden;
    position: relative;
    // background: #e3e3e3;
    z-index: 40;
    h3 {
        padding: 40px 0 0 24px;
        font-size: 32px;
    }
}

.map-list-container {
    @media #{$medium-and-up} {
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-between;
        > div {
            // width: 47%;
            width: 24.5%;
        }
	}
}

</style>
