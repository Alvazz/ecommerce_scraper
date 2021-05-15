<template>
  <div class="container" style="padding-top: 5%;">
    <div class="row justify-content-center">
      <div class="col-lg-4">
        <div class="card p-2">
          <div class="card-title text-center">
            <h3>Login</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="loginUser">
              <div class="form-group mt-2 mb-2">
                <label for="email">Email:</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="loginModel.email"
                />
              </div>
              <div class="form-group mt-2 mb-2">
                <label for="password">Password:</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="loginModel.password"
                />
              </div>
              <hr />
              <button class="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: "Login",

  data() {
    return {

      loading: false,

      loginModel: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    async loginUser() {
      this.loading = true;
      await this.$store.dispatch("loginUser", this.loginModel);
      this.loading = false;
    },
  },
  
};
</script>
