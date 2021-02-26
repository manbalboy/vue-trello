import Vue from 'vue';
import Vuex from 'vuex';
import * as api from '@/api';

Vue.use(Vuex);
export default new Vuex.Store({
    //state 는 => data와비슷
    state: {
        isAddBoard: false,
    },
    //getters 는 computed 랑 비슷
    actions: {
        ADD_BOARD(context, { title }) {
            return api.board.create(title);
        },
    },

    mutations: {
        SET_IS_ADD_BOARD(state, toggle) {
            state.isAddBoard = toggle;
        },
    },
});
