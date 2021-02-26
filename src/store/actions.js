import * as api from '@/api';
const actions = {
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
            .then(({ accessToken }) => context.commit('LOGIN', accessToken));
    },
};
export default actions;
