<template>
  <div class="">
    <div class="my-5">
    <div class="card mx-auto" style="max-width: 380px;">
        <div class="card-body">
  
        <router-link to="/">
            <img src="/images/favicon.png" class="" style="width: 20%; margin-left: auto; margin-right: auto; display: block;">
        </router-link>
  
        <h4 class="card-title mb-4 text-center">Inicia Sesion</h4>
        
        <form v-on:submit.prevent="login">
            <div class="form-group my-3">
                <input v-model="form.email" class="form-control" placeholder="email" type="email" autocomplete="off" autofocus>
            </div> <!-- form-group// -->
            
            <div class="form-group">
                   <input v-model="form.password" class="form-control" placeholder="Password" type="password" autocomplete="off">
            </div> <!-- form-group// -->
            
            <div class="form-group">
                <a href="#" class="float-right">Olvidaste tu constraseña?</a> 
              <label class="float-left custom-control custom-checkbox d-none"> <input type="checkbox" class="custom-control-input"> <div class="custom-control-label"> Remember </div> </label>
            </div> <!-- form-group form-check .// -->
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block"> Iniciar Sesion </button>
            </div> <!-- form-group// -->    
        </form>

        </div> <!-- card-body.// -->
      </div> <!-- card .// -->
      <p class="text-center mt-4">Aun no tienes una cuenta? <router-link to="/register">Crea una cuenta</router-link></p>
      
      </div>
      <Footer/>
  </div>
</template>

<script>
import Footer from "./Footer.vue"
export default {

  
  name: 'Home',
  components: {
    Footer
  },

  data () {
    return {
      form: {}
    }
  },

  methods: {
    login(){
      let login_config = {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
			  body: JSON.stringify(this.form)
      }

      fetch("/api/login-session", login_config)
      .then(res => res.json())
      .then(data => console.log(data))
    }
  }
}
</script>

<style scoped>

</style>
