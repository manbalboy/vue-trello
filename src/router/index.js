import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '', redirect: { name: 'home' } },
    { path: '/home', name: 'home', component: { template: '<div>foo</div>' } },
    {
        // vue 2에서는 '*' 만 해도 됨 vue 3 에서는 다음과 같이 동작
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: { template: '<div>notfound</div>' },
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
