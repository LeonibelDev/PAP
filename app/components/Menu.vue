
<template>
  <div class="">
    <div class="menu-pc">
    <div class="container mb-4">
      <div class="row align-items-center">
        <div class="col-lg-2 col-4">
          <router-link to="/" class="brand-wrap">
            <img class="logo" src="/images/logo4.png" title="logo">
          </router-link> <!-- brand-wrap.// -->
          </div>
          <div class="col-lg-6 col-sm-12">
            <form action="#" class="search">
              <div class="input-group w-100">
                <input type="text" class="form-control" placeholder="Buscar producto...">
                <div class="input-group-append">
                  <button class="btn btn-danger" type="submit" style="color:#fff;">
                    <i class="fa fa-search"></i> Buscar
                  </button>
                </div>
              </div>
            </form> <!-- search-wrap .end// -->
          </div> <!-- col.// -->
              <div class="col-lg-4 col-sm-6 col-12">
                
                <div class="widgets-wrap float-md-right">
                  <div class="widget-header icontext">
                    <div class="text">
                      <div class="mt-2">
                        <router-link to="/login" class="btn btn-danger btn-sm text-white">Iniciar Sesión</router-link> |
                        <router-link to="/register"> Registrarte</router-link>
                      </div>
                    </div>
                  </div>
                </div> <!-- widgets-wrap.// -->
                  
                  <!-- if session -->
                  <div class="widgets-wrap float-md-right">
                    <div class="widget-header mr-3">
                      <a href="/cart" class="icon icon-sm ">
                          <img src="/images/icons/add-to-basket.svg" class="" style="width: 24px;">
                      </a>
                      <span class="badge badge-pill badge-danger badge-circle notify"></span>
                    </div>
                    
                    <div class="widget-header icontext">
                      <li class="dropdown" style="list-style: none;">
                        <a class="icon icon-sm nav-link p-0" data-toggle="dropdown" href="#">
                          <img src="/images/icons/user.svg" class="" style="width: 24px;">
                        </a>
                        
                        <div class="dropdown-menu user-menu">
                          <a class="dropdown-item" href="#">Perfil</a>
                          <a class="dropdown-item" href="#">Mis Compras</a>
                          <div class="dropdown-divider"></div>
                          <a class="dropdown-item" href="/new-product">Añadir un producto</a>
                          <a class="dropdown-item" href="#">Category 2</a>
                          <span class="dropdown-item" href="" onclick="logout()"><span class="">Cerrar Sesion</span></span>
                        </div>
                      </li>
                    </div>

                  </div> <!-- widgets-wrap.// -->

                </div> <!-- col.// -->
              </div> <!-- row.// -->
            </div>
    </div>



    <div class="menu-phone">
      <a href="#" class="js-colorlib-nav-toggle colorlib-nav-toggle border rounded d-block opacity-icon"><i></i></a>
      <aside id="colorlib-aside" role="complementary" class="js-fullheight">

        <div>
          <div class="col-lg-2 col-4">
            <a href="/" class="brand-wrap">
              <img class="logo" src="/images/logo4.png" title="logo">
            </a> <!-- brand-wrap.// -->
          </div>

        </div>

        <nav id="colorlib-main-menu" role="navigation">
          <ul>
            <li class=""><a href="/">Inicio</a></li>
          <% if(!session){ %>
            <li><a href="/register">Registrarte</a></li>
            <li><a href="/login">Iniciar Sesion</a></li>
          <% } else { %>
            <li><a href="/new-product">Publicar Producto</a></li>
            <li class="widget-header">
              <div class="mr-3">
                <a href="/cart" class="">Carrito</a>
                <span class="mx-0 badge badge-pill badge-danger notify" style="font-size: 15px; z-index: 1000;">0</span>
              </div>
            </li>
            <li><a href="#" onclick="logout()">Cerrar Sesion</a></li>
            
          <% } %>   
            <li><a href="#">Ayuda</a></li>
            <li><a href="#">Contactos</a></li>
          </ul>
        </nav>
      </aside>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
