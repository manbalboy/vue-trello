import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '', redirect: { name: 'home' } },
    { path: '/home', name: 'home', component: { template: '<div>foo</div>' } },
    // { path: '/about', name: 'about', component: About },
    // { path: '/todos', name: 'todoList', component: TodoList },
    // { path: '/todos/add', name: 'addTodo', component: AddTodo },
    // { path: '/todos/update/:id', name: 'updateTodo', component: UpdateTodo },
    // { path: '/:catchAll(.*)', component: NotFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
