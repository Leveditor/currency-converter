import { createRouter, createWebHistory } from 'vue-router';
import Convert from './views/Convert.vue';
import ValueCurrency from './components/ValueCurrency.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ValueCurrency
  },
  {
    path: '/convert',
    name: 'Convert',
    component: Convert
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
