<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {

    name: "login_layout",
    middleware: "unauth_redirect",

}
</script>

<style>

</style>