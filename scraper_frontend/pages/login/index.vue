<template>
  <div class="container" style="margin-top: 10%">
    <div class="row justify-content-center">
      <div class="col-lg-3"></div>
      <div class="col-lg-6 text-white">
        <v-card outlined>
          <v-card-title>Sign In Here</v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-container>
            <form>
              <v-form>
                <v-text-field
                  type="email"
                  v-model="loginModel.email"
                  label="E-mail"
                  required
                  color="error"
                ></v-text-field>

                <v-text-field
                  v-model="loginModel.password"
                  label="Password"
                  required
                  color="error"
                  type="password"
                ></v-text-field>

                <v-btn
                  type="button"
                  @click.prevent="onLogin"
                  block
                  depressed
                  color="error"
                >
                  Login
                </v-btn>
              </v-form>
            </form>
          </v-container>
        </v-card>

        <v-container>
          <div class="row">
            <div class="col-lg-6">
              <v-btn elevation="2" outlined raised @click="forgotPassword">
                Forgot Password?
              </v-btn>
            </div>
            <div class="col-lg-6 pull-right">
              <v-btn elevation="2" outlined raised @click="goToRegister">
                Not an User? Register Here
              </v-btn>
            </div>
          </div>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  layout: "unAuth",

  data() {
    return {
      loading: false,

      loginModel: {
        email: "sapt1@yopmail.com",
        password: "ubuntu",
      },
    };
  },

  methods: {
    async onLogin() {
      console.log(this.loginModel);
      try {
        await this.$auth.loginWith("local", {
          data: this.loginModel,
        });
      } catch (ex) {
        const { data } = ex.response;
        if (data.status && data.status.message) {
          this.$swal.fire({
            icon: "error",
            text: data.status.message,
            showConfirmButton: false,
          });
        } else {
          this.$swal.fire({
            icon: "error",
            text: data,
            showConfirmButton: false,
          });
        }
      }
    },

    forgotPassword() {},

    goToRegister() {
      this.$router.push({ path: "/register" });
    },
  },
};
</script>
