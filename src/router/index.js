import { createWebHistory, createRouter } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue')
    },
    {
        path: '/markup-list',
        name: 'Markup',
        component: () => import('@/views/markup/index.vue')
    },
    {
        path: '/markup-main',
        name: 'MarkupMain',
        component: () => import('@/views/markup/MarkupMain.vue')
    },
    {
        path: '/markup-write',
        name: 'MarkupWrite',
        component: () => import('@/views/markup/MarkupWrite.vue')
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
});