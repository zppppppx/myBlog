import { createRouter, createWebHistory } from "vue-router";
// import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        alias: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/admin/writeArticle',
        name: 'Admin',
        component: () => import('../views/admin/createArticle.vue')
    },
    // The two above are just tests
    {
        path: '/admin/RegisterAndLogin',
        name: 'RegisterAndLogin',
        component: () => import('../views/admin/RegisterAndLogin.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router