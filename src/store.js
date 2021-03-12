import Vue from "vue";
import Vuex from "vuex";
import usuariosNamespace from "./modules/usuarios"
import categoriasNamespace from "./modules/categorias"
import articulosNamespace from "./modules/articulos"
import ventasNamespace from "./modules/ventas"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    usuariosNamespace,
    categoriasNamespace,
    articulosNamespace,
    ventasNamespace
  }
});