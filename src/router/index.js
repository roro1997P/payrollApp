import { createRouter, createWebHistory } from 'vue-router';
import Payrolls from '../views/Payrolls';
import Account from '../views/Account';

const routes = [
  {
    path: '/',
    name: 'Payrolls',
    component: Payrolls
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
