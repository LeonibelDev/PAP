// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'

import BoostrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'


/* FONTAWESOME */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)
/* FONTAWESOME */

Vue.config.productionTip = false
Vue.use(BoostrapVue)
Vue.use(VueRouter)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

/* Router */
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Home from './components/Home.vue'
import Product from './components/Product.vue'


const routes = [
  { path: "/", component: Home},
  { path: "/login", component: Login},
  { path: "/register", component: Register},
  { path: "/product/:Id", component: Product, props: true}
]

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: routes
})

/* eslint-disable no-new */
// new Vue({
//   render: h => h(App)
// }).$mount("#app")

new Vue({
  router,
  components: { App },
  template: '<App/>'
}).$mount("#app")
