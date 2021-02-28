import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import Board from '@/components/Board.vue';
import Card from '@/components/Card.vue';
import NotFound from '@/components/NotFound.vue';
import store from '@/store/index.js';

Vue.use(VueRouter);

const requireAuth = (to, from, next) => {
    const loginPath = `${
        process.env.VUE_APP_BASE_URL
    }/login?rPath=${encodeURIComponent(to.path)}`;
    store.getters.isAuth ? next() : next(loginPath);
};

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: `${process.env.VUE_APP_BASE_URL}`,
            component: Home,
            beforeEnter: requireAuth,
        },
        {
            path: `${process.env.VUE_APP_BASE_URL}/login`,
            component: Login,
        },
        {
            path: `${process.env.VUE_APP_BASE_URL}/b/:bid`,
            component: Board,
            beforeEnter: requireAuth,
            children: [{ path: 'c/:cid', component: Card }],
        },
        {
            path: `${process.env.VUE_APP_BASE_URL}/*`,
            component: NotFound,
        },
    ],
});

export default router;
