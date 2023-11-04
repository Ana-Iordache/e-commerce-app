import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import ConnectUser from '@/views/user-navigation/account-section/ConnectUser.vue';
import NewIn from '@/views/app-navigation/NewIn.vue'
import Clothing from '@/views/app-navigation/Clothing.vue'
import Shoes from '@/views/app-navigation/Shoes.vue'
import Accessories from '@/views/app-navigation/Accessories.vue'
import UserAccount from '@/views/user-navigation/UserAccount.vue'
import Favorites from '@/views/user-navigation/Favorites.vue'
import ShoppingCart from '@/views/user-navigation/ShoppingCart.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/logout',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/connect',
    component: ConnectUser,
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
    meta: {
      requiredAuth: true
    }
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

// without this, when we hit refresh, even if we are logged in because by the time the refresh page happens
// firebase current user doesn't exists (firebase isn't initialized yet)
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(getAuth(), user => {
      removeListener();
      resolve(user);
    }, reject);
  })
}

router.beforeEach(async (to, from, next) => {
  if(to.matched.some(record => record.meta.requiredAuth)) {
    if(await getCurrentUser()) {
      next();
    } else {
      next("/connect");
    }
  } else {
    next();
  }
})

export default router;