import axios from 'axios';
import router from '../router';

const DOMAIN = 'http://java-coder.co.kr:18908';
const UNAUTHORIZED = 401;
const onUnauthorized = () => {
    router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`);
};

const request = (method, url, data) => {
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    return axios({
        method,
        url: DOMAIN + url,
        data,
    })
        .then(result => result.data)
        .catch(result => {
            const { status } = result.response;
            if (status === UNAUTHORIZED) onUnauthorized();
            throw result.response;
        });
};

export const setAuthInHeader = token => {
    axios.defaults.headers.common['Authorization'] = token
        ? `Bearer ${token}`
        : null;
};

export const auth = {
    login(email, password) {
        return request('post', '/login', { email, password });
    },
};

export const board = {
    fetch(id) {
        return id ? request('get', `/boards/${id}`) : request('get', '/boards');
    },
    create(title) {
        return request('post', '/boards', { title });
    },
    update(id, payload) {
        return request('put', `/boards/${id}`, payload);
    },
    destory(id) {
        return request('delete', `/boards/${id}`);
    },
};
export const list = {
    create(payload) {
        return request('post', '/lists', payload);
    },
};

export const card = {
    create(title, listId, pos) {
        return request('post', '/cards', { title, listId, pos });
    },

    fetch(id) {
        return request('get', `/cards/${id}`);
    },

    update(id, payload) {
        return request('put', `/cards/${id}`, payload);
    },

    destory(id) {
        return request('delete', `/cards/${id}`);
    },
};
