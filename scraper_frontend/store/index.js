import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import authModule from "./authModule";

export default () => {
  return new Vuex.Store({
    modules: {
      authModule,
    },
  })
}