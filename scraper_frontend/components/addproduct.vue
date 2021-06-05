<template>
  <v-card>
    <v-card-title>Add Product</v-card-title>
    <v-container>
      <v-row>
        <v-col cols="12">
          <form @submit.prevent="addProduct">
            <v-text-field
              v-model="productName"
              label="Enter Product link"
              required
              color="error"
            ></v-text-field>
          </form>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "AddProduct",
  data() {
    return {
      productName: "",
    };
  },

  methods: {
    addProduct() {
      console.log(this.productName);
    },
  },
};
</script>
