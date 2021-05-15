export default {

  namespace: true,

  state: {
    loginResponse: {
      'message': '',
      'type': '',
      'errors': {
        'email': '',
        'password': ''
      }
    },
  },

  getters: {
    getLoginResponse(state) {
      return state.loginResponse;
    },
  },

  actions: {
    async loginUser({ commit }, loginModel) {
      console.log(loginModel);
    },
  },

  mutations: {
    SET_LOGIN_RESPONSE(state, value) {
      state.loginResponse = value;
    },
  }
};