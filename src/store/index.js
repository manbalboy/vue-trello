import Vue from 'vue';
import Vuex from 'vuex';
import * as api from '@/api';

Vue.use(Vuex);
const store = new Vuex.Store({
    //state 는 => data와비슷
    state: {
        isAddBoard: false,
        boards: [],
        token: null,
    },
    //getters 는 computed 랑 비슷

    getters: {
        isAuth(state) {
            return !!state.token;
        },
    },
    actions: {
        ADD_BOARD(context, { title }) {
            return api.board.create(title);
        },

        FETCH_BOARDS(context) {
            return api.board
                .fetch()
                .then(data => {
                    context.commit('SET_BOARDS', data.list);
                    return data;
                })
                .catch(err => {
                    return err;
                });
        },

        LOGIN(context, { email, password }) {
            return api.auth
                .login(email, password)
                .then(({ accessToken }) =>
                    context.commit('LOGIN', accessToken),
                );
        },
    },

    mutations: {
        SET_IS_ADD_BOARD(state, toggle) {
            state.isAddBoard = toggle;
        },

        SET_BOARDS(state, boards) {
            state.boards = boards;
        },

        LOGIN(state, token) {
            if (!token) {
                return;
            }
            state.token = token;
            localStorage.setItem('token', token);
            api.setAuthInHeader(token);
        },

        LOGOUT(state) {
            state.token = null;
            delete localStorage.token;
            api.setAuthInHeader(null);
        },
    },
});

const { token } = localStorage;
store.commit('LOGIN', token);
export default store;
