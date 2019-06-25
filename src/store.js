import Vue from 'vue'
import Vuex from 'vuex'
import state from './js/store/state'
import mutations from './js/store/mutations'
import getters from './js/store/getters'

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions: {}
})
