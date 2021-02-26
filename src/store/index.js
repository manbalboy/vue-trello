import Vue from 'vue';
import Vuex from 'vuex';
import state from '@/store/state.js';
import getters from '@/store/getters.js';
import actions from '@/store/actions.js';
import mutations from '@/store/mutations.js';

Vue.use(Vuex);
const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});

const { token } = localStorage;
store.commit('LOGIN', token);
export default store;
