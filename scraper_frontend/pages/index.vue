<template>
  <div>

    <button @click="logoutUser">Logout</button>

  </div>
</template>

<script>
export default {
  methods: {
    async logoutUser () {
      await this.$auth.logout("local");
    },
  },
}
</script>
