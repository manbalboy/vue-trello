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

    UPDATE_BOARD(context, { id, title, bgColor }) {
        return api.board.update(id, { title, bgColor }).then(() => {
            context.dispatch('FETCH_BOARD', { id: context.state.board.id });
        });
    },

    DELETE_BOARD(context, { id }) {
        return api.board.destory(id);
    },

    ADD_LIST(context, { title, boardId, pos }) {
        return api.list.create({ title, boardId, pos }).then(() => {
            context.dispatch('FETCH_BOARD', { id: context.state.board.id });
        });
    },

    UPDATE_LIST(context, { title, id, pos }) {
        return api.list.update(id, { title, pos }).then(() => {
            context.dispatch('FETCH_BOARD', { id: context.state.board.id });
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

    UPDATE_CARD(context, { id, title, description, pos, listId }) {
        return api.card
            .update(id, { title, description, pos, listId })
            .then(() => {
                context.dispatch('FETCH_BOARD', { id: context.state.board.id });
            });
    },

    DELETE_CARD(context, { id }) {
        return api.card.destory(id).then(() => {
            context.dispatch('FETCH_BOARD', { id: context.state.board.id });
        });
    },
};
export default actions;
