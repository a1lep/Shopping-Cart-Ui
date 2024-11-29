<template>
  <form @submit.prevent="addProduct" class="d-flex align-items-center mb-4">
    <input
        type="text"
        v-model="newProduct.name"
        placeholder="Product Name"
        class="form-control col input-style"
        required
    />
    <input
        type="number"
        v-model="newProduct.price"
        placeholder="Price (€)"
        class="form-control col input-style"
        min="0"
        step="0.1"
        required
    />
    <input
        type="number"
        v-model="newProduct.quantity"
        placeholder="Quantity"
        class="form-control col input-style"
        min="1"
        required
    />
    <button class="btn btn-primary col-2 button-style">Add</button>
  </form>
</template>

<script>
import { addProductToCart } from "@/api/cart";

export default {
  data() {
    return {
      newProduct: {
        name: "",
        price: "",
        quantity: "",
      },
    };
  },
  methods: {
    addProduct() {
      addProductToCart(this.newProduct).then(() => {
        this.$emit("refresh-cart");
        this.newProduct = { name: "", price: "", quantity: "" };
      });
    },
  },
};
</script>