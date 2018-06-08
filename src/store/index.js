import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


const SET_PAGE = 'SET_PAGE';

export default new Vuex.Store({
    state:{
        debug: false,
        count: 0,
        page: null
    },
    mutations:{
        SET_PAGE: (state, payload) => {
            state.page = payload
        },

        increment (state) {
            state.count++
        }
    },
    actions:{
        GET_PAGE: ({commit, dispatch}) => {
            axios.get('http://park-pumpkin.test/cms/wp-json/wp/v2/pages/2')
                .then(function (response) {
                commit(SET_PAGE, response.data);
            })
                .catch(function (error) {
                console.log(error)
            })
        }
    }
})