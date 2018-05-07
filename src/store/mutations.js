import { state } from './state'

import { 
    ADD_SINGLE_RESOURCE,
    RECEIVE_GRANT_DATA, 
    SET_ACTIVE_CATEGORIES,
    SET_ACTIVE_LIST,  
    SET_ACTIVITY_LIST,
    SET_FILTER_STATE,
    SET_LOAD_STATUS,
    SET_LOCATION_LIST,
    SET_LIST_STATE,
    SET_RESOURCES, 
    TOGGLE_LANGUAGE, 
} from './mutation-types'

export const mutations = {
    ADD_SINGLE_RESOURCE(state, post, id) {
        let copy = state.singlePostCache
        // Check if key/post exist already
        if (copy.hasOwnProperty(id)) {
            console.log('POST ALREADY IN STORE')
            return
        } else {
            console.log('ADDING POST TO STORE')
            copy[id] = post;
            state.singlePostCache = copy
        }
    },
    SET_ACTIVE_CATEGORIES(state, list) {
        state.checkedActivityList = list
    },
    SET_ACTIVE_LIST(state, list) {
        state.activeEvents = list
    },
    SET_ACTIVITY_LIST(state, list) {
        state.activityList = list
    },
    SET_FILTER_STATE(state, status) {
        state.filterViewState = status
    },
    SET_LOAD_STATUS(state) {
        state.initialLoadCheck = false
    },
    SET_LOCATION_LIST(state, list) {
        state.locationList = list
    },
    SET_LIST_STATE(state, status) {
        state.listViewState = status
    },
    SET_RESOURCES(state, list) {
        state.resourceList = list
    },
    TOGGLE_LANGUAGE(state, lang) {
        state.language = lang
    },
    
}