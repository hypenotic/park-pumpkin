<template v-if="this.$store.state.locationList != null">
    <section id="map">
        <app-filter></app-filter>
        <div class="map-container" v-bind:class="{ 'list-open': this.$store.state.listViewState }">
            <section class="google-map" id="grants-map"></section>
            <app-map-list></app-map-list>
            <div class="loading" v-bind:class="{ 'active-loader': showLoader }">Loading&#8230;</div>
            <!-- <input id="pac-input" class="controls wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s" type="text" placeholder="Enter your address to find park events near you." style="position: absolute; top: 0; z-index: 15;"> -->
            <button id="reset-location" class="button hidden-reset-loc" style="position: absolute; z-index: 1;">Reset Map</button>
        </div>
    </section>
</template>

<script>
    import Filter from './Filter.vue';
    import MapList from './MapList.vue';
    export default {
        components: {
            appFilter: Filter,
            appMapList: MapList
        },
        props: {
            'latitude': {
                type: Number,
                default: function(){
                return 43.52385109999999
                }
            },
            'longitude': {
                type: Number,
                default: function(){
                return -79.71254299999998
                }
            },
            'zoom': {
                type: Number,
                default: function(){
                return 4
                }
            }
        },
        data() {
            return {
                mapName: "grants-map",
                // markerCoordinates: [],
                // bounds: null,
                filters: [],
                markers: [],
                infoWindows: [],
                posts: [],
                showLoader: false,
                showList: false,
                bluePin: 'https://parkpeople.ca/listings/custom/uploads/2018/05/pumpkinpin.svg',
                orangePin: 'https://parkpeople.ca/listings/custom/uploads/2018/05/pumpkinpin.svg',
                greenPin: 'https://parkpeople.ca/listings/custom/uploads/2018/05/pumpkinpin.svg',
                morePin: 'https://parkpeople.ca/listings/custom/uploads/2018/04/more_events_marker.svg',
            }
        },
        mounted() {
            this.bounds     = new google.maps.LatLngBounds();
            const element   = document.getElementById('grants-map');
            // const mapCentre = this.markerCoordinates[0]
            const options   = {
                // How zoomed in you want the map to start at (always required)
                zoom: 4,
                mapTypeControl: false,
                scrollwheel:  false,
                // draggable: isDraggable,

                // The latitude and longitude to center the map (always required)
                center: {lat: this.latitude, lng: this.longitude}, 

                // How you would like to style the map. 
                // This is where you would paste any style found on Snazzy Maps.
                styles: [
                    {
                        "featureType": "all",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "saturation": 36
                            },
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 40
                            }
                        ]
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 20
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 17
                            },
                            {
                                "weight": 1.2
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 10
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 21
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 17
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 29
                            },
                            {
                                "weight": 0.2
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 18
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 19
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 17
                            }
                        ]
                    }
                ]
            }

            // Store 'this' in a variable, so you can referecne 'this' properly in
            // the following fucntions
            let app = this;

            // Listen for the event fired when the user selects a prediction and retrieve more details for that place.
            let input = document.getElementById('pac-input');
            app.searchBox = new google.maps.places.SearchBox(input);
            app.searchBox.addListener('places_changed', function() {
                // app.triggerSearch();
                // console.log('places changed!');
                app.chooseFilter();
            });
            // Listen for when the reset location button is pressed
            document.getElementById("reset-location").onclick = function() {
                app.triggerSearchReset();
                // app.chooseFilter();
            };
            // Listen for when the filter submit button is pressed
            // document.getElementById("apply-search").onclick = function() {
            //     // app.applyFilters();
            //     app.chooseFilter();
            // };

            app.map = new google.maps.Map(element, options);
            
            // Add a couple map listeners for the searchbox
            app.map.addListener('zoom_changed', function() {  
                if (input.classList.contains('small-search')) {
                } else {
                    input.classList.add('small-search');
                }
            });
            app.map.addListener('drag', function() {  
                if (input.classList.contains('small-search')) {
                } else {
                    input.classList.add('small-search');
                }
            });

            app.oms = new OverlappingMarkerSpiderfier(app.map, {
                markersWontMove: true,
                markersWontHide: true,
                // basicFormatEvents: true
            });

            app.buildMarkers();
        },
        methods: {
            chooseFilter() {
                let app = this;
                // Check if there is a value in the searchbox and checked checkboxes
                let input = document.getElementById('pac-input');
                let value = input.value;
                let checkboxes = document.getElementsByClassName('ck-box');
                let check = [];
                for(var i = 0; i < checkboxes.length; i++) {
                    if (checkboxes[i].checked == true) {
                        check.push(i);
                    }
                }

                if (value.length==0 && check.length > 0) {
                    // If search bar is empty, and activities are checked 
                    console.log(1, 'no search, yes activities');
                    app.applyFilters();
                } else if (value.length>0 && check.length > 0) {
                    // If both search bar and activities are full
                    console.log(2, 'yes search, yes activities');
                    // Make sure we unhide the reset map button
                    let reset = document.getElementById('reset-location');
                    if (reset.classList.contains('hidden-reset-loc')) {
                        reset.classList.remove('hidden-reset-loc');
                    }
                    // Apply filters
                    app.applyFilters();
                } else if (value.length>0 && check.length == 0) {
                    // If search bar is not empty, and activities are not checked
                    console.log(3, 'yes search, no activities');
                    // Trigger Search
                    app.triggerSearch();
                } else {
                    console.log(4, 'catch all - initial render?');
                    // Fire this in mounted()
                    app.resetMarkers();
                }
            },
            showAll() {
                console.log('showAll');
                let app = this;
            },
            hideOutsideRadius(places) {
                console.log('hideOutsideRadius');
                let app = this;
                
                var placeLat = places[0].geometry.location.lat();
                var placeLng = places[0].geometry.location.lng();

                var originPlace = new google.maps.LatLng(placeLat, placeLng);

                let active = [];

                for (var i=0; i < app.locations.length; i++) {
                    let newPlace = new google.maps.LatLng(app.locations[i].lat, app.locations[i].lng);
                    var distanceBT = google.maps.geometry.spherical.computeDistanceBetween(originPlace, newPlace);

                    if (distanceBT > 5000) {
                        // app.markers[i].setVisible(false);
                    } else {
                        active.push(app.locations[i]);
                    }
                }

                return active;
                // send active to activeList prop in state
                // Make sure activeList is what buildMarkers uses

                // app.buildMarkers();
            },
            applyFilters(filtered = null) {
                let app = this;

                console.log('applyFilters');

                // Close the activity filter
                if (this.$store.state.filterViewState == true) {
                    this.$store.dispatch("filterViewState",this.$store.state.filterViewState );
                }
                
                // Make sure the searchbox shrinks
                let input = document.getElementById('pac-input');
                if (input.classList.contains('small-search')) {
                } else {
                    input.classList.add('small-search');
                }

                // Grab the IDs of the checked activities
                let nameArray = app.$store.state.checkedActivityList;

                // This function tests whether two array have at least one matching value
                let findOne = function (haystack, arr) {
                    return arr.some(function (v) {
                        return haystack.indexOf(v) >= 0;
                    });
                }

                // Check if there is a value in the searchbox and checked checkboxes
                let value = input.value;
                let checkboxes = document.getElementsByClassName('ck-box');
                let check = [];
                for(var i = 0; i < checkboxes.length; i++) {
                    if (checkboxes[i].checked == true) {
                        check.push(i);
                    }
                }

                if ((value.length == 0 && check.length == 0) || (value.length==0 && check.length > 0) ) {
                    console.log('Filter Option 1');

                    app.clearMarkers();

                    let active = [];
                    for (var i=0; i<app.locations.length; i++) {
                        // Grab the array of activity (taxonomy) IDs
                        let combined = app.locations[i].activity;
                        // Compare both 
                        var test = findOne(combined,nameArray);
                        // If false, event does not include at least one of the 
                        // activities in the checkedActivityList array in the store
                        if (test !== false) {
                            console.log('activityMatch', app.locations[i]);
                            active.push(app.locations[i]);
                        }
                    }

                    console.log('activityMatch', active);
                    app.$store.dispatch("setActiveEvents", active );

                } else if (value.length>0 && check.length > 0) {
                    console.log('Filter Option 2');

                    app.clearMarkers();

                    let places = app.searchBox.getPlaces();
                    var placeLat = places[0].geometry.location.lat();
                    var placeLng = places[0].geometry.location.lng();

                    var originPlace = new google.maps.LatLng(placeLat, placeLng);

                    let active = [];
                    for (var i=0; i<app.locations.length; i++) {
                        // Grab the array of activity (taxonomy) IDs
                        let combined = app.locations[i].activity;
                        // Compare both 
                        var test = findOne(combined,nameArray);

                        let newPlace = new google.maps.LatLng(app.locations[i].lat, app.locations[i].lng);
                        var distanceBT = google.maps.geometry.spherical.computeDistanceBetween(originPlace, newPlace);
                        
                        // If false, event does not include at least one of the 
                        // activities in the checkedActivityList array in the store
                        if (test == false || distanceBT > 5000) {
                            // app.markers[i].setVisible(false);
                        } else {
                            // bounds.extend( app.markers[i].getPosition()); 
                            active.push(app.locations[i]);
                        }
                    }

                    // console.log(bounds);
                    // if (bounds.b.b != 180 ) {
                    //     app.map.fitBounds(bounds);
                    // } else {
                    //     // TKISSUE
                    // }

                    console.log('activityMatch', active);
                    app.$store.dispatch("setActiveEvents", active );

                    // app.rebuildMarkers();

                } else if (value.length >0 && check.length == 0) {
                    console.log('Filter Option 3');
                } else if (value.length == 0 && check.length > 0) {
                    console.log('Filter Option 4');
                } else {
                    console.log('Filter Option 5');
                }    

            },
            triggerSearchReset() {
                let app = this;
                console.log('resetting location');

                let input = document.getElementById('pac-input');
                input.value ='';
                input.focus();

                this.resetMarkers();
            },
            triggerSearch() {
                console.log('triggerSearch');
                let app = this;

                app.clearMarkers();

                let places = app.searchBox.getPlaces();
                
                if (places.length == 0) {
                    return;
                }

                console.log('places: ', places.length, places);

                let input = document.getElementById('pac-input');
                if (input.classList.contains('small-search')) {
                } else {
                    input.classList.add('small-search');
                }
                
                let reset = document.getElementById('reset-location');
                if (reset.classList.contains('hidden-reset-loc')) {
                    reset.classList.remove('hidden-reset-loc');
                }

                let inRange = app.hideOutsideRadius(places);

                var bounds = new google.maps.LatLngBounds();
                places.forEach(function(place) {
                    if (!place.geometry) {
                        console.log("Returned place contains no geometry");
                        return;
                    }

                    var placeLat = place.geometry.location.lat();
                    var placeLng = place.geometry.location.lng();

                    var originPlace = new google.maps.LatLng(placeLat, placeLng);
                    
                    var icon = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    };

                    let here = 'https://parkpeople.ca/listings/custom/uploads/2018/04/pin_here.svg';

                    // Create a marker for each place.
                    var markerLabel = "YOU";
                    app.markers.push(new google.maps.Marker({
                        map: app.map,
                        icon: here,
                        zIndex: 1,
                        position: place.geometry.location,
                    }));

                    // var markerLabel = "YOU";
                    // var marker = new google.maps.Marker({
                    //     map: app.map,
                    //     icon: here,
                    //     zIndex: 1,
                    //     position: place.geometry.location,
                    // });
                    // app.markers.push(marker);
                    // app.oms.addMarker(marker);
                })

                app.map.fitBounds(bounds);

                console.log('inRange', inRange);
                app.$store.dispatch("setActiveEvents", inRange );

            },
            buildMarkers(){
                let app = this;

                // Let's combine this method with rebuildMarkers
                // We can set a variable to contain the right set of locations with a conditional
                app.markers = [];
                app.infoWindows = [];

                /*
                    Iterate over all of the events
                */
                for( var i = 0; i < app.locations.length; i++ ){
                    /*
                        Set marker position
                    */
                    let theposition = new google.maps.LatLng(app.locations[i].lat, app.locations[i].lng);

                    /*
                        Choose marker style based on type
                    */
                    if (app.locations[i].type == 'event') {
                        
                        let the_icon = '';
                        if (app.locations[i].timeframe == 'morethan30') {
                            the_icon = app.bluePin;
                        } else if (app.locations[i].timeframe == 'within30') {
                            the_icon = app.orangePin;
                        } else {
                            the_icon = app.greenPin; 
                        }

                        /*
                            Create the marker for each of the locations and set the
                            latitude and longitude to the latitude and longitude
                            of the location. Also set the map to be the local map.
                        */
                        
                        let iconSize = new google.maps.Size(42, 40);
                        let marker = new google.maps.Marker({
                            position: theposition,
                            map: app.map,
                            title: app.locations[i].title,
                            icon: {
                                url: the_icon,  
                                scaledSize: iconSize
                            }
                        });

                        /*
                            Push the new marker on to the array.
                        */
                        app.markers.push( marker );

                        /*
                            Create the info window and add it to the local
                            array.
                        */
                        // console.log(app.locations[i].listing);
                        let windowString = app.infoWindowString(app.locations[i].slug,app.locations[i].id,app.locations[i].title,app.locations[i].listing[1],app.locations[i].listing[2],app.locations[i].listing[0],app.locations[i].nice_start_date,app.locations[i].start_time,app.locations[i].end_time,app.locations[i].address,app.locations[i].timeframe);

                        let infoWindow = new google.maps.InfoWindow({
                            content: windowString
                        });

                        app.infoWindows.push( infoWindow );
                        
                        /*
                        Add the event listener to open the info window for the marker.
                        */   
                        google.maps.event.addListener(marker, 'spider_click', (function(marker, i) {
                            return function() {
                                infoWindow.setContent(windowString);
                                infoWindow.open(app.map, marker);
                            }
                        })(marker, i));
                        
                        app.oms.addMarker(marker);

                    } else {
                        return
                    }

                }

                app.oms.addListener('format', function(marker, status) {
                    var iconURL = status == OverlappingMarkerSpiderfier.markerStatus.SPIDERFIED ? app.bluePin :
                        status == OverlappingMarkerSpiderfier.markerStatus.SPIDERFIABLE ? app.morePin :
                        status == OverlappingMarkerSpiderfier.markerStatus.UNSPIDERFIABLE ? app.orangePin :
                        app.greenPin;
                    marker.setIcon({
                        url: iconURL,
                        scaledSize: new google.maps.Size(23, 32)  // makes SVG icons work in IE
                    });
                });

                this.map.panBy(-80, -200);

            },
            clearMarkers(){
                console.log('clearMarkers start', this.markers, this.infoWindows);
                let app = this;
                /*
                    Iterate over all of the markers and set the map
                    to null so they disappear.
                */
                for( var i = 0; i < app.markers.length; i++ ){
                    app.markers[i].setVisible(false);
                    app.markers[i].setMap( null );
                    
                }

                app.markers = [];
                app.infoWindows = [];
                console.log('clearMarkers end', app.markers, app.infoWindows);
            },
            checkLoader(){
                if (this.$store.state.locationList.length > 0) {
                    this.showLoader = false;
                } else {
                    this.showLoader = false;
                }
            },
            infoWindowString(slug,id,title,groupName,groupSlug,groupID,startDate,startTime,endTime,address,timeframe) {
                let header = '';
                if (timeframe =='past'){
                    header = '<h6 style="margin-bottom: 10px;font-size: 16px;">'+ title + '</h6>';
                } else {
                    header = '<h6 style="margin-bottom: 10px;font-size: 16px;"><a href="https://parkpeople.ca/listings/events/?n='+ slug + '&id='+ id +'&tdgrant=true" target="_blank">'+ title +'</a></h6>';
                }
                return '<div style="width: 250px;">' + header +'<p style="margin:0;font-size:12px;line-height: 1.5;"><i class="fa fa-users"></i> <a href="https://parkpeople.ca/listings/groups/?n='+groupSlug+'&id='+groupID+'&tdgrant=true" target="_blank" style="font-weight: bold;">'+groupName+'</a></p><p style="margin:0;font-size:12px;line-height: 1.5;"><i class="fa fa-calendar-o" aria-hidden="true"></i> '+  startDate +'</p><p style="margin:0;font-size:12px;line-height: 1.5;"><i class="fa fa-clock-o" aria-hidden="true"></i> '+startTime+' - '+endTime+'</p><span style="display:none;">'+timeframe+'</span><p style="margin:0;font-size:12px;line-height: 1.5;"><i class="fa fa-map-marker" aria-hidden="true"></i> '+address+'</p></div>';
            },
            rebuildMarkers(){
                let app = this;
                console.log('rebuild markers', app.activeMarkers)

                // this.clearMarkers();
                
                // COMMINGTING THIS OUT MADE THE PLACES DISAPPEAR
                // app.markers = [];
                // app.infoWindows = [];

                let bounds = new google.maps.LatLngBounds();

                /*
                    Iterate over all of the events
                */
                for( var i = 0; i < app.activeMarkers.length; i++ ){
                    console.log((i+1)+' - ', app.activeMarkers[i].id);
                    /*
                        Set marker position
                    */
                    let theposition = new google.maps.LatLng(app.activeMarkers[i].lat, app.activeMarkers[i].lng);

                    /*
                        Choose marker style based on type
                    */
                    if (app.activeMarkers[i].type == 'event') {
                        
                        let the_icon = '';
                        if (app.activeMarkers[i].timeframe == 'morethan30') {
                            the_icon = app.bluePin;
                        } else if (app.activeMarkers[i].timeframe == 'within30') {
                            the_icon = app.orangePin;
                        } else {
                            the_icon = app.greenPin; 
                        }

                        /*
                            Create the marker for each of the locations and set the
                            latitude and longitude to the latitude and longitude
                            of the location. Also set the map to be the local map.
                        */
                        var iconSize = new google.maps.Size(45, 42);
                        var marker = new google.maps.Marker({
                            position: theposition,
                            map: app.map,
                            title: app.activeMarkers[i].title,
                            // title: app.activeMarkers[i].title,
                            // icon: {
                            //     url: the_icon,
                            //     scaledSize: iconSize
                            // },
                            flag: app.activeMarkers[i].timeframe
                        });

                        // let the_icon = '';
                        // let flag = '';
                        // if (app.activeMarkers[i].timeframe == 'morethan30') {
                        //     the_icon = app.bluePin;
                        //     flag = 'morethan30';
                        // } else if (app.activeMarkers[i].timeframe == 'within30') {
                        //     the_icon = app.orangePin;
                        //     flag = 'within30';
                        // } else {
                        //     the_icon = app.greenPin; 
                        //     flag = 'past';
                        // }

                        let iconSize = new google.maps.Size(45, 42);
                        let iconURL = '';
                        let special = app.morePin;
                        google.maps.event.addListener(marker, 'spider_format', function(status) {
                            console.log('single_marker:', marker);
                            if (status == OverlappingMarkerSpiderfier.markerStatus.SPIDERFIABLE) {
                                iconSize = new google.maps.Size(100, 100);
                                iconURL = special;
                                // iconURL = the_icon;
                                // iconSize = new google.maps.Size(45, 42);
                            } else {
                                iconSize = new google.maps.Size(45, 42);
                                iconURL = the_icon;
                            }
                            console.log('status:', status, '- '+marker.title);
                            marker.setIcon({
                                url: iconURL,
                                scaledSize: iconSize
                            });
                        });

                        console.log('markers',app.markers);

                        // I think only one pin is showing up because there is no count for markers [i]

                        /*
                            Push the new marker on to the array.
                        */
                        app.markers.push( marker );

                        /*
                            Create the info window and add it to the local
                            array.
                        */
                        let windowString = app.infoWindowString(app.activeMarkers[i].slug,app.activeMarkers[i].id,app.activeMarkers[i].title,app.activeMarkers[i].listing[1],app.activeMarkers[i].listing[2],app.activeMarkers[i].listing[0],app.activeMarkers[i].nice_start_date,app.activeMarkers[i].start_time,app.activeMarkers[i].end_time,app.activeMarkers[i].address,app.activeMarkers[i].timeframe);

                        let infoWindow = new google.maps.InfoWindow({
                            content: windowString
                        });

                        app.infoWindows.push( infoWindow );
                        
                        /*
                        Add the event listener to open the info window for the marker.
                        */ 
                        google.maps.event.addListener(marker, 'spider_click', (function(marker, i) {
                            return function() {
                                infoWindow.setContent(windowString);
                                infoWindow.open(app.map, marker); 
                            }
                        })(marker, i));
                        
                        bounds.extend( app.markers[i].getPosition()); 
                        app.oms.addMarker(marker);

                    } else {
                        return
                    }

                    let iconURL = '';
                    let iconSize = '';
                    app.oms.addListener('format', function(marker, status) {
                        // console.log(marker);
                        if (status == OverlappingMarkerSpiderfier.markerStatus.SPIDERFIABLE) {
                            iconSize = new google.maps.Size(100, 100);
                            iconURL = app.morePin;
                        } else {
                            if (marker.flag == 'morethan30') {
                                iconURL = app.bluePin;
                            } else if (marker.flag == 'within30') {
                                iconURL = app.orangePin;
                            } else {
                                iconURL = app.greenPin; 
                            }
                            iconSize = new google.maps.Size(45, 42);
                        }
                        marker.setIcon({
                            url: iconURL,
                            scaledSize: iconSize  // makes SVG icons work in IE
                        });
                    });

                    app.map.fitBounds(bounds);
                }

            },
            resetMarkers(){
                console.log('resetMarkers');
                
                let app = this;
                
                app.clearMarkers();
                // this.markers = [];

                // Let's combine this method with rebuildMarkers
                // We can set a variable to contain the right set of locations with a conditional
                app.markers = [];
                app.infoWindows = [];

                // let bounds = new google.maps.LatLngBounds();

                /*
                    Iterate over all of the cafes
                */
                for( var i = 0; i < app.locations.length; i++ ){
                    /*
                        Set marker position
                    */
                    let theposition = new google.maps.LatLng(app.locations[i].lat, app.locations[i].lng);

                    /*
                        Choose marker style based on type
                    */
                    if (app.locations[i].type == 'event') {
                        
                        let the_icon = '';
                        if (app.locations[i].timeframe == 'morethan30') {
                            the_icon = app.bluePin;
                        } else if (app.locations[i].timeframe == 'within30') {
                            the_icon = app.orangePin;
                        } else {
                            the_icon = app.greenPin; 
                        }

                        /*
                            Create the marker for each of the locations and set the
                            latitude and longitude to the latitude and longitude
                            of the location. Also set the map to be the local map.
                        */
                        var iconSize = new google.maps.Size(45, 42);
                        var marker = new google.maps.Marker({
                            position: theposition,
                            map: app.map,
                            title: app.locations[i].timeframe,
                            icon: {
                                url: the_icon,
                                scaledSize: iconSize
                            }
                        });

                        /*
                            Push the new marker on to the array.
                        */
                        app.markers.push( marker );

                        /*
                            Create the info window and add it to the local
                            array.
                        */
                        // console.log(app.locations[i].listing);
                        let windowString = app.infoWindowString(app.locations[i].slug,app.locations[i].id,app.locations[i].title,app.locations[i].listing[1],app.locations[i].listing[2],app.locations[i].listing[0],app.locations[i].nice_start_date,app.locations[i].start_time,app.locations[i].end_time,app.locations[i].address,app.locations[i].timeframe);

                        let infoWindow = new google.maps.InfoWindow({
                            content: windowString
                        });

                        app.infoWindows.push( infoWindow );
                        
                        /*
                        Add the event listener to open the info window for the marker.
                        */   
                        google.maps.event.addListener(marker, 'spider_click', (function(marker, i) {
                            console.log('hey');
                            return function() {
                                infoWindow.setContent(windowString);
                                infoWindow.open(app.map, marker);
                            }
                        })(marker, i));
                        // let theMap = this.map;
                        // let infoWindow = new google.maps.InfoWindow();
                        // this.oms.addListener('click', function(marker, event, i) {
                        //     infoWindow.setContent('hey');
                        //     infoWindow.open(theMap, marker);
                        // });
                        // bounds.extend( app.markers[i].getPosition()); 
                        app.oms.addMarker(marker);

                    } else {
                        return
                    }

                    // app.oms.addListener('format', function(marker, status) {
                    //     var iconURL = status == OverlappingMarkerSpiderfier.markerStatus.SPIDERFIED ? app.bluePin :
                    //         status == OverlappingMarkerSpiderfier.markerStatus.SPIDERFIABLE ? app.morePin :
                    //         status == OverlappingMarkerSpiderfier.markerStatus.UNSPIDERFIABLE ? app.orangePin :
                    //         app.greenPin;
                    //     marker.setIcon({
                    //         url: iconURL,
                    //         scaledSize: new google.maps.Size(23, 32)  // makes SVG icons work in IE
                    //     });
                    // });

                    let iconURL ='';
                    let iconSize = '';
                    app.oms.clearListeners('format');

                }
                
                /*
                    Bring map back to original position
                */ 
                // Make a latlng from original co-ords
                let LatLng = new google.maps.LatLng(43.52385109999999,-79.71254299999998);
                // Position the map accordingly
                app.map.panTo(LatLng);
                app.map.setZoom(4);
                app.map.panBy(-80, -120);

                let empty = [];
                app.$store.dispatch("setActiveEvents", empty );
                
            },
            setMarkers(type){
                // app.clearMarkers();

                // Let's combine this method with rebuildMarkers
                // We can set a variable to contain the right set of locations with a conditional
                this.markers = [];
                this.infoWindows = [];

                /*
                    Iterate over all of the cafes
                */
                for( var i = 0; i < this.locations.length; i++ ){
                    /*
                        Set marker position
                    */
                    let theposition = new google.maps.LatLng(this.locations[i].lat, this.locations[i].lng);

                    /*
                        Choose marker style based on type
                    */
                    if (this.locations[i].type == 'event') {
                        
                        let the_icon = '';
                        if (this.locations[i].timeframe == 'morethan30') {
                            the_icon = app.bluePin;
                        } else if (this.locations[i].timeframe == 'within30') {
                            the_icon = app.orangePin;
                        } else {
                            the_icon = app.greenPin; 
                        }

                        /*
                            Create the marker for each of the locations and set the
                            latitude and longitude to the latitude and longitude
                            of the location. Also set the map to be the local map.
                        */
                         var iconSize = new google.maps.Size(35, 32);
                        var marker = new google.maps.Marker({
                            position: theposition,
                            map: this.map,
                            title: this.locations[i].title,
                            icon: {
                                url: the_icon,
                                scaledSize: iconSize
                            }
                        });

                        /*
                            Push the new marker on to the array.
                        */
                        this.markers.push( marker );

                        /*
                            Create the info window and add it to the local
                            array.
                        */
                        let windowString = app.infoWindowString(app.locations[i].slug,app.locations[i].id,app.locations[i].title,app.locations[i].listing[1],app.locations[i].listing[1],app.locations[i].listing[2],app.locations[i].listing[0],app.locations[i].nice_start_date,app.locations[i].start_time,app.locations[i].end_time,app.locations[i].address,app.locations[i].timeframe);

                        let infoWindow = new google.maps.InfoWindow({
                            content: windowString
                        });

                        this.infoWindows.push( infoWindow );
                        
                        /*
                        Add the event listener to open the info window for the marker.
                        */ 
                        marker.addListener('click', function() {
                            // infoWindow.close();
                            // if (infoWindow) { infoWindow.close();}
                            infoWindow.open(this.map, this);
                        });
                        //Allow each marker to have an info window    
                        // google.maps.event.addListener(marker, 'spider_click', (function(marker, i) {
                        //     console.log('hey');
                        //     return function() {
                        //         infoWindow.setContent(windowString);
                        //         infoWindow.open(this.map, marker);
                        //     }
                        // })(marker, i));
                        // let theMap = this.map;
                        // let infoWindow = new google.maps.InfoWindow();
                        // this.oms.addListener('click', function(marker, event, i) {
                        //     infoWindow.setContent('hey');
                        //     infoWindow.open(theMap, marker);
                        // });
                        
                        this.oms.addMarker(marker);

                        // windowArray.push(windowString);
                        // this.windows.push(windowArray);
                        
                        // var infoWindow = new google.maps.InfoWindow(), marker, i;
                    } else {
                        return
                    }

                }

                this.map.panBy(-80, -120);

            }
        },
        computed: {
            locations(){
                return this.$store.getters.allLocations;
            },
            activeMarkers(){
                return this.$store.getters.allActiveEvents;
            },
            activeInfoWindows(){
                return this.$store.getters.activeInfoWindows;
            },
            activeEvents(){
                if (this.$store.state.activeEvents[0] == 'init') {
                    console.log('activeEvents = initial load');
                    return this.$store.state.allLocations;
                } else if (this.$store.state.activeEvents.length > 0) {
                    console.log('activeEvents is not empty');
                    return this.$store.state.activeEvents;
                } else {
                    console.log('activeEvents is empty');
                    return this.$store.state.allLocations;
                }
            }
        },
        watch: {
            /*
                Watches the list of locations in the store. 
                When they are updated, clear the markers and re build them.
                TKNOTE: This is eventually should be attached to the getter that contained filtered results.
            */
            locations(){
                // this.clearMarkers();
                this.buildMarkers();
                // this.resetMarkers();
                // this.checkLoader();
            },
            activeMarkers(){
                // this.clearMarkers();
                this.rebuildMarkers();
                // this.checkLoader();
            }
        },
    }
</script>

<style lang="scss" scoped>

@import '../../styles/variables.scss';
@import '../../styles/components/loader.scss';
@import '../../styles/components/map.scss';

.pac-container {
    z-index: 1051 !important;
}

</style>