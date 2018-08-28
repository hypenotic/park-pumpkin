<template v-if="this.$store.state.locationList != null">
    <section class="filter" >

        <!-- <div class="legend">
            <ul>
                <li>Legend:</li>
                <li>
                    <app-marker color="orange"></app-marker>
                    <span>- In less than 30 days</span>
                </li>
                <li>
                    <app-marker color="blue"></app-marker>
                    <span>- In more than 30 days</span>
                </li>    
                <li>                    
                    <app-marker color="green"></app-marker>
                    <span>- Past</span>
                </li>
            </ul>
        </div>       -->
        
        <ul class="map-type">
            <li id="map-view-trigger" v-on:click="listTrigger" class="view-trigger" v-bind:class="[this.$store.state.listViewState ? '' : 'active-trigger']"><img src="../../assets/map-trigger.svg" alt=""></li>
            <li id="list-view-trigger" v-on:click="listTrigger" class="view-trigger" v-bind:class="[this.$store.state.listViewState ? 'active-trigger' : '']"><i class="fa fa-list fa-2x" aria-hidden="true"></i></li>
        </ul>
    </section>
</template>

<script>
    import Marker from './Marker.vue';
    export default {
        components: {
            appMarker: Marker
        },
        data() {
            return {
                showActivityList: false,
                filters: [],
                checkedCategories: [],
                clearFilterCheck: [],
                mobileFilter: false
            }
        },
        mounted() {
            let app = this;
            // Listen for when the filter submit button is pressed
            // document.getElementById("clear-filters").onclick = function() {
            //     app.checkedCategories = [];
            // };
        },
        methods: { 
            changeFilters() {
                console.log('change filters');

            },
            applyFilters() {
                console.log('apply filters');
            },
            filterChange() {
                // Check if there are any active category buttons
                if (this.checkedCategories.length > 0) {
                    this.$store.dispatch("filterChange", this.checkedCategories);
                    this.clearFilterCheck = [];
                } else {
                    // if not, just reset everything
                    this.$store.dispatch("clearFilters", 'active');
                    this.checkedCategories = [];
                    this.clearFilterCheck = ['all'];
                }
            },
            clearFilters(event) {
                // if (event.target.checked) {
                //     this.$store.dispatch("clearFilters", 'active');
                //     this.checkedCategories = [];
                // } else {
                //     return
                // }
            },
            listTrigger() {
                this.$store.dispatch("listViewState",this.$store.state.listViewState );

                // TK – Might wanna store the searchbox status in the store
                let input = document.getElementById('pac-input');
                if (input.classList.contains('small-search')) {
                } else {
                    input.classList.add('small-search');
                }
            },
            filterTrigger() {
                this.$store.dispatch("filterViewState",this.$store.state.filterViewState );
            }
        },
        computed: {
            filterCount() {
                return this.checkedCategories.length;
            }
        },
    }
</script>

<style lang="scss" scoped>

@import '../../styles/variables.scss';
@import '../../styles/components/filter.scss';

</style>