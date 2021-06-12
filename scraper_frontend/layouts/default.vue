<template>
  <v-app dark>
    <Navbar />
    <Nuxt />
  </v-app>
</template>

<script>

import Navbar from "../components/navbar.vue";

export default {
  components: {
    Navbar,
  },

  created: function () {
    this.handleLogin();
  },

  methods: {
    handleLogin: function () {
      if (!this.$auth.$state.loggedIn) {
        return this.$router.push({ path: "/login" });
      }
    },
  },

}
</script>
