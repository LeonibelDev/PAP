<template>
  <div class="">
        <section class="section-content py-2">

<!-- ============================ COMPONENT REGISTER   ================================= -->
	<div class="card mx-auto" style="max-width:50vh;">
      <article class="card-body">

      	<router-link to="/">
            <img src="/images/favicon.png" class="" style="width: 20%; margin-left: auto; margin-right: auto; display: block;">
        </router-link>
		
		<header class="mb-4 text-center"><h4 class="card-title">Crear una cuenta</h4></header>
		<form v-on:submit.prevent="sendForm">
				<div class="form-row">
					<div class="col form-group">
						<label>Nombre</label>
					  	<input type="text" class="form-control" placeholder="" v-model="form.user_name" required="">
					</div> <!-- form-group end.// -->
					<div class="col form-group">
						<label>Apellidos</label>
					  	<input type="text" class="form-control" placeholder="" v-model="form.user_lastname" required="">
					</div> <!-- form-group end.// -->
				</div> <!-- form-row end.// -->
				
				<div class="form-row">
					<div class="col form-group">
						<label>Edad</label>
					  	<input type="number" class="form-control" placeholder=""  v-model.number="form.age" required="">
					</div> <!-- form-group end.// -->
					<div class="col form-group">
						
					</div> <!-- form-group end.// -->
				</div> <!-- form-row end.// -->

				<div class="form-group">
					<label>Email</label>
					<input type="email" class="form-control" placeholder="@" v-model="form.email" required="">
					<small class="form-text text-muted">Nunca compartas tu direccion de correo electronico.</small>
				</div> <!-- form-group end.// -->
				
				<div class="form-group">
					<label>Telefono / Celular</label>
					<!-- <input type="tel" id="phone" name="phone" placeholder="+1" class="form-control" required> -->
					<input id="phoneField" type="text" v-model="form.phone" class="form-control" required="">

				</div> <!-- form-group end.// -->				

				<div class="form-group">
					<label>Lugar (D.M)</label>

					<select class="form-control" v-model="form.place" required="">
				        <option value="Padre Las Casas"> Padre Las Casas </option>
						<option value="Las Lagunas"> Las Lagunas </option>
						<option value="La Siembra"> La Siembra  </option>
						<option value="Monte Bonito"> Monte Bonito </option> 
						<option value="Los Fríos"> Los Fríos </option>
						<option value="Las Yayas"> Las Yayas </option>
						<option value="Guayabal"> Guayabal </option>
					</select>
				</div> <!-- form-group end.// -->	

				<header class="mt-4"><h6 class="card-title text-muted">Direccion Residencial #1</h6></header>
				<div class="form-row">
					<div class="col form-group">
						<label>Calle</label>
					  	<input type="text" class="form-control" placeholder="C/" v-model="form.street_name" required="">
					</div> <!-- form-group end.// -->
					<div class="col form-group">
						<label>Numero de casa</label>
					  	<input type="number" class="form-control" placeholder="#" min="0" max="9999" v-model.number="form.house_number" required=""> 
					</div> <!-- form-group end.// -->
				</div> <!-- form-row end.// -->


				<div class="form-row">
					<div class="form-group col-md-6">
						<label>Contraseña</label>
					    <input class="form-control" type="password" v-model="form.password" required="">
					</div> <!-- form-group end.// --> 

				</div>

			    <div class="form-group">
			        <button type="submit" class="btn btn-primary btn-block"> Crear Cuenta </button>
			    </div> <!-- form-group// -->

			    <div class="form-group"> 
		            <label class="custom-control custom-checkbox"> <input type="checkbox" class="custom-control-input" required=""> <div class="custom-control-label"> Acepto los <a href="#">terminos y condiciones</a>  </div> </label>
		        </div> <!-- form-group end.// -->           
			</form>
			<button class="btn btn-primary" v-on:click="redir">Redir</button>
		</article><!-- card-body.// -->
    </div> <!-- card .// -->
    <p class="text-center mt-4">Ya tienes una cuenta? <router-link to="/login">Inicia Sesion</router-link></p>
    <br><br>
<!-- ============================ COMPONENT REGISTER  END.// ================================= -->


</section>
<!-- ========================= SECTION CONTENT END// ========================= -->

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
	  redir(){
		this.form = {}
	  },

	  sendForm() {
		let form = document.getElementById('form')
		
		let request_config = {
			method: "POST",
			headers: { "Content-Type": "application/json"},
			body: JSON.stringify(this.form)
		}

		console.log(this.form)
		fetch("http://localhost:8081/register", request_config)
		.then(response => response.json())
		.then(function (data){
			this.$router.replace({name: "/login"})
		})

		}
		
	  }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .card *, .card{
    border: none !important;
}

.card{
    box-shadow: rgba(221, 221, 221, 0.2) 0px 8px 24px;
    
}

.card input, .card textarea, .card select{
    box-shadow: rgba(100, 100, 111, 0.1) 0px 2px 29px 0px;

}

.card .btn{
    width: 100%;
} */
</style>
