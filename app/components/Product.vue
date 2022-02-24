<template>
  <div class="">
    <Menu/>

    <main class="container page-wrapper">
      
        <div class="row align-items-center py-3 py-md-4">
          <div class="col-sm-6 col-md-6">
            <div class="mb-5 mb-sm-0 text-center text-sm-start" id="colorOptions">
              
              
    
    <!-- ================== COMPONENT SLIDER  BOOTSTRAP  ==================  -->
    <div id="carousel1_indicator" class="carousel slide" data-ride="carousel" >
      <!-- <ol v-bind:class="`carousel-indicators ` + (product.images.length < 2 ? 'd-none' : '')" v-for="x in product.images.length">
          
        <li v-bind:class="`bg-danger ` + (x == 0 ? 'active' : '') " data-target="#carousel1_indicator" v-bind:data-slide-to="(x-1)"></li>       
      
      </ol> -->
      <div class="carousel-inner py-3" style="height: 70vh;" >  
      
        <div id="image-carousel" v-for="image in product.images" v-bind:class="`carousel-item ` + (image == product.images[0] ? 'active' : '')">
          <img v-bind:class="`d-block img-fluid` + (image == product.images[0] ? 'active' : '')" style="margin-left: auto; margin-right: auto; max-width: 400px; height: auto; width: 100%;" v-bind:src="`/products/` + image" alt="Image">
        </div>
  
      </div>
    
      <a class="carousel-control-prev" href="#carousel1_indicator" role="button" data-slide="prev">
        <i class="fa fa-arrow-left bg-danger p-2 rounded-circle" aria-hidden="true"></i>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carousel1_indicator" role="button" data-slide="next">
        <i class="fa fa-arrow-right bg-danger p-2 rounded-circle" aria-hidden="true"></i>
        <span class="sr-only">Next</span>
      </a>
    </div> 
    <!-- ==================  COMPONENT SLIDER BOOTSTRAP end.// ==================  .// -->  
    
    
      
            
            </div>
          </div>
          <div class="col-sm-6 text-sm-start col-md-6">
            <h2 class="pb-2">{{product.product_name}}</h2>
            
    
            <div class="mb-3"><span><h3 class="d-inline">RD$ {{product.product_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }}</h3></span></div>
          
          <div v-if="data_server == 200">

            <form id="form_buy" method="POST" action="/shopping?product_id=<%= product.id %>">
              <input type="number" name="quantity" class="form-control col-sm-2 quantity" value="1" max="<%= product.quantity %>" oninvalid="this.setCustomValidity('Tu cantidad excede la cantidad disponible de <%= product.quantity %>')">
    
              <button type="submit" class="btn btn-lg btn-danger btn-block col-sm-8 my-2" onsubmit="compra()">comprar ahora</button>
            </form>
            
            <a class="btn btn-lg btn-block col-sm-8 shopping-cart" href="#" id="<%= product.id %>"><i class="fa fa-shopping-cart"></i></a>
          </div>

          <router-link class="btn btn-danger btn-lg btn-block col-sm-8" v-else v-bind:to="'/login?redirect=/product/'+product._id">Registrate Para Comprar</router-link>
    
          </div>
        </div>

        <div class="row">
          
              <div class="col-lg-5 col-md-6 col-sm-8 offset-lg-2 offset-md-1">
                <h5 class="mb-3">Descripcion / Detalle</h5>
                <p class="fs-sm mb-3 mb-lg-4 pb-2 fw-medium">
                  {{product.product_desc}}             
                </p>
                
              </div>
              <div class="col-lg-3 col-md-4 col-sm-4 offset-md-1">
                <h5 class="mb-3">Detalles del Producto</h5>
                
                <ul class="list-unstyled fs-sm mb-3 mb-lg-4 pb-1 spacing">
                  <li>
                    <strong>Estado:</strong> 
                    {{product.status}}
                  </li>
                  
                  <li>
                    <strong>Marca/Modelo:</strong> 
                    {{product.model_or_brand}}
                  </li>
                  
                  <li>
                    <strong>Cantidad:</strong> 
                    {{product.quantity}}
                  </li>
    
                  <li>
                    <strong>Color:</strong> 
                    {{product.color}}
                  </li>
    
                  <li>
                    <strong>Categoria:</strong>
                    
                    <span v-for="tag in product.tags">
                      <span class="mx-1 badge badge-pill badge-danger">
                        {{tag}}
                      </span>
                    </span>

                  </li>
    
                </ul>
              </div>
        </div>

      </main>
    

    <Footer/>   
  </div>
</template>

<script>
import Footer from "./Footer.vue"
import Menu from "./Menu.vue"

export default {
  name: 'Product',
  title: '',

  components: {
    Menu,
    Footer
  },

  props: {
    Id: { 
      required: true,
    },
  },

  created() {
    this.getProducts()
  },

  data () {
    return {
      data_server: null,
      product: []
    }
  },

    methods: {
      getProducts(){
        fetch('/api/product/' + this.Id)
        .then((res) => {
          this.data_server = res.status
          console.log(res)
          return res.json()
        })
        .then((data) => {
          this.product = data
          this.title = data.product_name
          console.log(this.data_server)
        })
        
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
 
</style>
