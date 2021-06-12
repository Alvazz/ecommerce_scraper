<template>
  <v-app dark>
    <Nuxt />
  </v-app>
</template>

<script>
export default {
  
  name: "unAuth",

  created: function () {
    this.handleLogin();
  },

  methods: {
    handleLogin: function () {
      if (this.$auth.$state.loggedIn) {
        return this.$router.push({ path: "/" });
      }
    },
  },
  
};
</script>
