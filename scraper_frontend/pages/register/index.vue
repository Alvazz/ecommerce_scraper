<template>
  <div class="container" style="margin-top: 10%">
    <div class="row justify-content-center">
      <div class="col-lg-3"></div>
      <div class="col-lg-6 text-white">
        <v-card outlined>
          <v-card-title>Sign Up Here</v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-container>
            <form>
              <v-form>
                <v-text-field
                  v-model="registerModel.firstName"
                  label="First Name"
                  color="error"
                ></v-text-field>

                <v-text-field
                  v-model="registerModel.lastName"
                  label="Last Name"
                  required
                  color="error"
                ></v-text-field>

                <v-text-field
                  type="email"
                  v-model="registerModel.email"
                  label="E-mail"
                  required
                  color="error"
                ></v-text-field>

                <v-text-field
                  v-model="registerModel.password"
                  label="Password"
                  required
                  color="error"
                ></v-text-field>

                <v-btn
                  type="button"
                  @click.prevent="onRegister"
                  block
                  depressed
                  color="error"
                >
                  Create an Account
                </v-btn>
              </v-form>
            </form>
          </v-container>
        </v-card>

        <v-container>
          <div class="row">
            <div class="col-lg-6">
              <v-btn elevation="2" outlined raised @click="verifyAccount">
                Verify Account
              </v-btn>
            </div>
            <div class="col-lg-6 pull-right">
              <v-btn elevation="2" outlined raised @click="goToLogin">
                Already User? Login Here
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
  name: "register",
  layout: "unAuth",

  data() {
    return {
      loading: false,

      registerModel: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    };
  },

  methods: {
    verifyAccount() {},

    onRegister() {
      console.log(this.registerModel);
    },

    goToLogin() {
      this.$router.push({ path: "/login" });
    },
  },
};
</script>
