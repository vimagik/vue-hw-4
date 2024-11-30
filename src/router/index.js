import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import ProductView from '@/views/ProductView.vue'
import ShoppingCartView from '@/views/ShoppingCartView.vue'

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
    },
    {
      path: '/cart',
      name: 'cart',
      component: ShoppingCartView,
      props: { cart: false }
    }
  ],
})

export default router
