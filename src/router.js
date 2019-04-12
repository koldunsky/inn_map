import Vue from 'vue';
import Router from 'vue-router';
import Main from './views/Main/index.vue';
import Auth from './views/Auth/index.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    }
  ]
})
