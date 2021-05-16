export default {

  namespace: true,

  state: {
  },

  getters: {
    getLoginResponse(state) {
      return state.loginResponse;
    },
  },

  actions: {
    async loginUser({ commit }, loginModel) {
      try {

        const response = await this.$auth.loginWith('local', { data: loginModel });
        console.log(response);

      } catch (ex) {

        if (ex.response) {
          if (ex.response.data.status) {
            console.log(ex.response.data.status.message);
          } else {
            console.log(ex.response.data);
          }
        } else {
          console.log(ex.message);
        }

      }
    },

    async registerUser({ commit }, registerModel) {

    },
  },

  mutations: {},

};
