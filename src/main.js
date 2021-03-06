import Vue from 'vue'
import VueAutosuggest from "vue-autosuggest";
import App from './App.vue'
import router from './router'
import index from './store/index'

import mouseCoordsToFloorCoords from './utils/js/mouseCoordsToFloorCoords.js';

import './global/style/index.scss';

Vue.config.productionTip = false;
Vue.use(VueAutosuggest);

new Vue({
    router,
    store: index,
    render: (h) => h(App),
    beforeCreate() {
        this.$store.commit('initialiseStore');
    }
}).$mount('#app');


document.addEventListener('mousemove', mouseCoordsToFloorCoords);
