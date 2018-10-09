import * as types from './mutation-types'
import axios from 'axios';
// import _ from 'lodash';

const igregex = /(http[^"]*\.jpg)(?=","config_width":320)/g;

export const actions = {
    getLocations({commit, dispatch, context, state}, info) {
        console.log('getLocations dispatched');
        // axios.get('http://dev.hypenotic.com/pp-map/wp-json/mapdata/v1/all')
        axios.get('https://parkpeople.ca/listings/wp-json/pumpkindata/v1/all')
        // axios.get('http://localhost:3000/wp-json/pumpkindata/v1/all')
        .then(function (response) {
            // let pageSlugKeys = _.mapKeys(response.data, 'slug');
            // commit(types.SET_PAGE_LIST, response.data);
            commit(types.SET_LOCATION_LIST, response.data);
            // commit(types.SET_PAGE_TEST, test);
        })
        .catch(function (error) {
            console.log(error)
        })
    },
    getActivities({commit, dispatch, context, state}, info) {
        console.log('getActivities dispatched');
        // axios.get('http://dev.hypenotic.com/pp-map/wp-json/mapdata/v1/all')
        axios.get('https://parkpeople.ca/listings/wp-json/activitydata/v1/all')
        // axios.get('http://dev.hypenotic.com/pp-map/wp-json/activitydata/v1/all')
        .then(function (response) {
            commit(types.SET_ACTIVITY_LIST, response.data);
        })
        .catch(function (error) {
            console.log(error)
        })
    },
    filterChange({commit, dispatch, context, state}, checkedCategories) {
        // dispatch("renderList", {'type': 'filter-change', 'list': state.activeList, 'checked': checkedCategories});
        commit(types.SET_ACTIVE_CATEGORIES, checkedCategories);
    },
    clearFilters({commit, dispatch, context, state}, status) {
        // if (status == 'active') {
        //     dispatch("renderList", {'type': 'filter-reset', 'list': state.activeList})
        // } else {
        //     return
        // }
    },
    listViewState({commit, dispatch, context, state}, status) {
        console.log('listViewState dispatched', status);
        if (status == true) {
            commit(types.SET_LIST_STATE, false);
        } else {
            commit(types.SET_LIST_STATE, true);
        }
    },
    filterViewState({commit, dispatch, context, state}, status) {
        console.log('filterViewState dispatched', status);
        if (status == true) {
            commit(types.SET_FILTER_STATE, false);
        } else {
            commit(types.SET_FILTER_STATE, true);
        }
    },
    setActiveEvents({commit, dispatch, context, state}, list) {
        console.log('setActiveList dispatched',list);
        commit(types.SET_ACTIVE_LIST, list);
    },
    scrapeInstagram({state, commit}) { 
        axios.get("https://www.instagram.com/explore/tags/pumpkinparades/").then( ({data}) => (data.match(igregex)) ).then( res => commit("pushIgphotos", res) ) }
}