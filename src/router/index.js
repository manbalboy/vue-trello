import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import NotFound from '@/components/NotFound.vue';
import Board from '@/components/Board.vue';
import Card from '@/components/Card.vue';

//네이게이션가드
const requireAuth = (to, from, next) => {
    const isAuth = localStorage.getItem('token');
    const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`;

    isAuth ? next() : next(loginPath);
};

const routes = [
    { path: '', redirect: { name: 'Home' } },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        beforeEnter: requireAuth,
    },
    { path: '/login', name: 'Login', component: Login },
    {
        path: '/b/:bid',
        name: 'Board',
        component: Board,
        beforeEnter: requireAuth,
        children: [
            {
                path: 'c/:cid',
                name: 'Card',
                component: Card,
                beforeEnter: requireAuth,
            },
        ],
    },

    {
        // vue 2에서는 '*' 만 해도 됨 vue 3 에서는 다음과 같이 동작
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound,
        meta: {
            requiresAuth: false,
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
