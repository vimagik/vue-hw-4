import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import ProductView from '../views/ProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductView
    }
  ],
})

export default router
