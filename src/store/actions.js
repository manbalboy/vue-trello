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

    ADD_CARD(context, { title, listId, pos }) {
        return api.card.create(title, listId, pos).then(() => {
            context.dispatch('FETCH_BOARD', { id: context.state.board.id });
        });
    },
    FETCH_CARD(context, { id }) {
        return api.card.fetch(id).then(data => {
            context.commit('SET_CARD', data.item);
        });
    },
};
export default actions;
