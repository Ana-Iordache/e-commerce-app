import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue'; 
import NewIn from '@/views/app-navigation/NewIn.vue'
import Clothing from '@/views/app-navigation/Clothing.vue'
import Shoes from '@/views/app-navigation/Shoes.vue'
import Accessories from '@/views/app-navigation/Accessories.vue'
import UserAccount from '@/views/user-navigation/UserAccount.vue'
import Favorites from '@/views/user-navigation/Favorites.vue'
import ShoppingCart from '@/views/user-navigation/ShoppingCart.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/newin',
    component: NewIn,
  },
  {
    path: '/clothing',
    component: Clothing,
  },
  {
    path: '/shoes',
    component: Shoes,
  },
  {
    path: '/accessories',
    component: Accessories,
  },
  {
    path: '/account',
    component: UserAccount,
  },
  {
    path: '/favorites',
    component: Favorites,
  },
  {
    path: '/cart',
    component: ShoppingCart,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;