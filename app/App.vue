<template>
  <div id="app">

    <router-view></router-view>


    

  </div>
</template>

<script>
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Home from './components/Home.vue'
import Product from './components/Product.vue'

export default {
  name: 'App',
  components: {
    Login,
    Home,
    Register,
    Product
  }
}
</script>

<style>

</style>
