<template>
  <div class="container mt-4 vintage-style">
    <h1 class="text-center mb-4 title-text">Shopping Cart</h1>
    <h3 class="section-header">Add Product</h3>
    <AddProductForm @refresh-cart="fetchCart" />

    <h3 class="section-header">Cart Items</h3>
    <CartTable :cartItems="cartItems" @refresh-cart="fetchCart" />

    <CartSummary
        :cartTotal="cartTotal"
        :tax="tax"
        :cartTotalWithTax="cartTotalWithTax"
    />
  </div>
</template>

<script>
import {
  fetchCartItems,
  fetchCartTotal,
  fetchTax,
  fetchCartTotalWithTax,
} from "@/api/cart";
import AddProductForm from "@/components/cart/AddProductForm.vue";
import CartTable from "@/components/cart/CartTable.vue";
import CartSummary from "@/components/cart/CartSummary.vue";

export default {
  components: {
    AddProductForm,
    CartTable,
    CartSummary,
  },
  data() {
    return {
      cartTotalWithTax: 0,
      tax: 0.0,
      cartTotal: 0,
      cartItems: [],
    };
  },
  methods: {
    fetchCart() {
      Promise.all([
        fetchCartItems().then((res) => (this.cartItems = res.data)),
        fetchCartTotal().then((res) => (this.cartTotal = res.data)),
        fetchTax().then((res) => (this.tax = res.data)),
        fetchCartTotalWithTax().then((res) => (this.cartTotalWithTax = res.data)),
      ]);
    },
  },
  mounted() {
    this.fetchCart();
  },
};
</script>