import Vue from 'vue';
import Router from 'vue-router';
import Main from './views/Main/index.vue';
import Auth from './views/Auth/index.vue';

Vue.use(Router);

export const route = {
    root: '/',
    auth: '/auth'
};

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: route.root,
      name: 'main',
      component: Main
    },
    {
      path: route.auth,
      name: 'auth',
      component: Auth
    }
  ]
})
