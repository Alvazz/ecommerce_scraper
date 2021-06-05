<template>
  <div>
    <v-app-bar color="error" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Ecommerce Scraper</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click.prevent="logoutUser" class="mr-6" icon> Logout </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logoutUser() {
      
    },
  },
};
</script>
