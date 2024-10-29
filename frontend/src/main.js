import { createApp } from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router'

import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

import Dashboard from './pages/dashboard.vue'
import BooksPage from './pages/books-page.vue'
import BookDetails from './pages/cart.vue'
import Cart from './pages/cart.vue'

createApp(App)
.use(bootstrap)
.use(VueRouter.createRouter({
    history: VueRouter.createWebHistory(process.env.BASE_URL),
    routes: [{
        path: '/cart',
        component: Cart,
    },{
        path: '/dashboard',
        component: Dashboard,
    },{
        path: '/library',
        component: BooksPage,
    },{
        path: '/librar/:bookId',
        component: BookDetails,
    }]
}))

.mount('#app')
