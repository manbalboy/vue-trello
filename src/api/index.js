import axios from 'axios';
import router from '@/router/index.js';

const DOMAIN = 'http://localhost:3000';
const UNAUTHORIZED = 401;
const onUnauthorized = () => {
    router.push('/login');
};

const setAuthInHeader = token => {
    axios.defaults.headers.common['Authorization'] = token
        ? `Bearer ${token}`
        : '';
};

const request = (method, url, data) => {
    return axios({
        method,
        url: DOMAIN + url,
        data,
    })
        .then(result => result.data)
        .catch(result => {
            // console.log('>>>', result);
            const { status } = result.response;
            // console.log('>>>', status);
            if (status === UNAUTHORIZED) {
                return onUnauthorized();
            }
            throw Error(result);
        });
};

const board = {
    fetch() {
        return request('get', '/boards');
    },
};

const auth = {
    login(email, password) {
        return request('post', '/login', { email, password });
    },
};

export { board, auth, setAuthInHeader };
