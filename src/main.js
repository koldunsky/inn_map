import Vue from 'vue'
import VueAutosuggest from "vue-autosuggest";
import App from './App.vue'
import router from './router'
import store from './store'

import mouseCoordsToFloorCoords from './utils/js/mouseCoordsToFloorCoords.js';

import './global/style/index.scss';

Vue.config.productionTip = false;
Vue.use(VueAutosuggest);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


document.addEventListener('mousemove', mouseCoordsToFloorCoords);