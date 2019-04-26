import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const API_KEY = 'AIzaSyBZ6UBKmM0Uf8goKxtB7IkpsqT-UEWAN8s'

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: API_KEY,
    libraries: 'places,drawing,visualization'
  }
});


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
