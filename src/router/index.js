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
        name: 'writeArticle',
        component: () => import('../views/admin/createArticle.vue')
    },
    {
        path: '/admin/editArticle',
        name: 'editArticle',
        component: () => import('../views/admin/editArticle.vue')
    },
    // The two above are just tests
    {
        path: '/RegisterAndLogin',
        name: 'RegisterAndLogin',
        component: () => import('../views/admin/RegisterAndLogin.vue')
    },
    {
        path: '/articles',
        name: 'articles',
        component: () => import('../views/article/articleList.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router