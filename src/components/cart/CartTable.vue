<template>
  <table class="table table-hover table-bordered vintage-table">
    <thead>
    <tr>
      <th>Product</th>
      <th>Quantity</th>
      <th>Price</th>
      <th>Action</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in cartItems" :key="item.name">
      <td>{{ item.name }}</td>
      <td>{{ item.quantity }}</td>
      <td>{{ item.price }} €</td>
      <td>
        <button
            @click="removeProduct(item.name)"
            class="btn btn-danger btn-sm action-button"
        >
          Remove
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import { removeProductFromCart } from "@/api/cart";

export default {
  props: ["cartItems"],
  methods: {
    removeProduct(name) {
      removeProductFromCart(name).then(() => {
        this.$emit("refresh-cart");
      });
    },
  },
};
</script>