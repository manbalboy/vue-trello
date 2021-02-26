import * as api from '@/api';
const actions = {
    ADD_BOARD(context, { title }) {
        return api.board.create(title).then(data => data.item);
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
            .then(({ accessToken }) => context.commit('LOGIN', accessToken));
    },

    FETCH_BOARD(context, { id }) {
        return api.board.fetch(id).then(data => {
            context.commit('SET_BOARD', data.item);
        });
    },
};
export default actions;
