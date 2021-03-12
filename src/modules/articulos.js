import axios from "axios";

export default {
  namespaced: true,
  state: {
    article: {},
    articles: [],
  },
  mutations: {
    setArticles(state, data) {
      state.articles = data;
    },
    setArticle(state, data) {
      state.article = data;
    },
    limpiar(state) {
      state.article = {};
    },
  },
  actions: {
    clear: async function({ commit }) {
      commit("limpiar");
    },
    newUser: async function({ commit }) {
      commit("limpiar");
    },
    getArticles: async function({ commit }, token) {
      let header = { Token: token };
      let configuracion = { headers: header };
      let data = null;

      // debugger;
      await axios
        .get("article/get", configuracion)
        .then(function(response) {
          data = response.data;
          commit("setArticles", data);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getArticle: async function({ commit }, dataArticle) {
      let header = { Token: dataArticle.token };
      let configuracion = { headers: header };
      let data = null;
      // debugger;
      await axios
        .get(`article/query?id=${dataArticle.id}`, configuracion)
        .then(function(response) {
          data = { data: response.data };
          commit("setArticle", data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    setArticle: async function({ commit }, dataArticle) {
      commit("setArticle", dataArticle.data);
    },
    saveArticle: async function({ dispatch }, dataArticle) {
      let header = { Token: dataArticle.token };
      let configuracion = { headers: header };
      let data = dataArticle.data;
      // debugger;
      await axios
        .post(
          "article/add",
          {
            name: data.name,
            surname: data.surname,
            email: data.email,
            rol: data.rol,
            phone: data.phone,
            password: data.password,
          },
          configuracion
        )
        .then(function(res) {
          // debugger;
          dispatch("getUsers", dataArticle.token);
          swal({
            title: "Buen trabajo!",
            text: `Usuario ${res.data.name} ${res.data.surname} agregado exitosamente`,
            icon: "success",
          });
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 422) {
              return swal({
                title: "Lo sentimos!",
                text: `${error.response.data.message}`,
                icon: "warning",
              });
            }
          } else {
            swal({
              title: "Lo sentimos!",
              text: `Ha ocurrido un error de tipo ${error}`,
              icon: "error",
            });
          }
        });
    },
    updateArticle: async function({ dispatch }, dataArticle) {
      let header = { Token: dataArticle.token };
      let configuracion = { headers: header };
      //debugger;
      let data = dataArticle.data;
      await axios
        .put(
          "article/update",
          {
            id: data.id,
            name: data.name,
            surname: data.surname,
            email: data.email,
            rol: data.rol,
            phone: data.phone,
            password: data.password,
          },
          configuracion
        )
        .then(function(res) {
          dispatch("getUsers", dataArticle.token);
          swal({
            title: "Buen trabajo!",
            text: `El usuario ${res.data.name} ${res.data.surname} fue editado exitosamente`,
            icon: "success",
          });
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 422) {
              return swal({
                title: "Lo sentimos!",
                text: `${error.response.data.message}`,
                icon: "warning",
              });
            }
          } else {
            swal({
              title: "Lo sentimos!",
              text: `Ha ocurrido un error de tipo ${error}`,
              icon: "error",
            });
          }
        });
    },
    activateArticle: async function({ dispatch }, dataArticle) {
      let header = { Token: dataArticle.token };
      let configuracion = { headers: header };
      //debugger
      await axios
        .put("article/activate", { id: dataArticle.id }, configuracion)
        .then(function(res) {
          dispatch("getUsers", dataArticle.token);
          swal({
            title: "Buen trabajo!",
            text: `Usuario ${res.data.name} ${res.data.surname} activado correctamente`,
            icon: "success",
          });
        })
        .catch(function(error) {
          swal({
            title: "Lo sentimos!",
            text: `Ha ocurrido un error de tipo ${error}`,
            icon: "error",
          });
        });
    },
    deactivateArticle: async function({ dispatch }, dataArticle) {
      let header = { Token: dataArticle.token };
      let configuracion = { headers: header };
      //debugger
      await axios
        .put("article/deactivate", { id: dataArticle.id }, configuracion)
        .then(function(res) {
          dispatch("getUsers", dataArticle.token);
          swal({
            title: "Buen trabajo!",
            text: `Usuario ${res.data.name} ${res.data.surname} desactivado correctamente`,
            icon: "success",
          });
        })
        .catch(function(error) {
          swal({
            title: "Lo sentimos!",
            text: `Ha ocurrido un error de tipo ${error}`,
            icon: "error",
          });
        });
    },
  },
};
