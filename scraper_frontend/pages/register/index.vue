<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <form @submit.prevent="registerUser" class="mt-2 mb-2">
          <div class="row">
            <div class="col-lg-6 form-group">
              <label for="first_name">First name:</label>
              <input type="text" class="form-control" id="first_name" />
            </div>
            <div class="col-lg-6">
              <label for="last_name">Last name:</label>
              <input type="text" class="form-control" id="last_name" />
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" class="form-control" id="email" />
          </div>

          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" class="form-control" id="password" />
          </div>

          <button>Sign Up Here</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",

  data() {
    return {
      registerModel: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      },
    };
  },

  methods: {
    registerUser() {

    },
  },
};
</script>
