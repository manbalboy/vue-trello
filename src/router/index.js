import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import NotFound from '@/components/NotFound.vue';
import Board from '@/components/Board.vue';
import Card from '@/components/Card.vue';

const routes = [
    { path: '', redirect: { name: 'Home' } },
    { path: '/home', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login },
    {
        path: '/b/:bid',
        name: 'Board',
        component: Board,
        children: [{ path: 'c/:cid', name: 'Card', component: Card }],
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
