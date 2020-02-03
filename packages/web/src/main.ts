import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/custom.scss'
import { BootstrapVue } from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart, faCat } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faShoppingCart, faCat)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// Install BootstrapVue
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
