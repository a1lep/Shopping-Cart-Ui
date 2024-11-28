<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Shopping Cart</h1>
    <h3>Add Product</h3>
    <form @submit.prevent="addProduct" class="d-flex align-items-center">
      <input type="text" v-model="newProduct.name" placeholder="Product Name" class="form-control col" required/>
      <input type="number" v-model="newProduct.price" placeholder="Price" class="form-control col" min="0" step="0.1" required/>
      <input type="number" v-model="newProduct.quantity" placeholder="Quantity" class="form-control col" min="1" required/>
      <button class="btn btn-outline-primary col-2">Add</button>
    </form>
    <br>
    <h3>Cart Items</h3>
    <table class="table">
      <thead>
      <tr>
        <th>Product</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in cartItems" :key="item">
        <td>{{ item.name }}</td>
        <td>{{ item.quantity }}</td>
        <td>{{ item.price }} €</td>
        <td>
          <button @click="removeProduct(item.name)" class="btn btn-outline-danger btn-sm">Remove</button>
        </td>
      </tr>
      </tbody>
    </table>



    <div class="d-flex justify-content-between">
      <h3>Total:</h3>
      <h3>{{ cartTotal.toFixed(2) }} €</h3>
    </div>
    <div class="d-flex justify-content-between">
      <h3>Tax:</h3>
      <h3>{{ tax.toFixed(2) }} €</h3>
    </div>
    <div class="d-flex justify-content-between">
      <h3>Total including tax:</h3>
      <h3>{{ cartTotalWithTax.toFixed(2) }} €</h3>
    </div>
  </div>
  <br>

</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    apibase: "http://localhost:8080/api/cart", // 8080 - back , front- 8081 - loome uued muutujad
    cartTotalWithTax: 0,
    tax: 0.0,
    cartTotal: 0,
    cartItems: [], //array toodete listist
    newProduct: {  // uus toode ning mis annan kaasa
      name: "",
      price: "",
      quantity: ""
    },
  }),
  methods: {
    fetchCart() { // kõik need mis siin sees on käivita
      axios.all([
        axios
            .get(`${this.apibase}/calculate-tax-total`)
            .then((res) => (this.cartTotalWithTax = res.data)),
        axios
            .get(`${this.apibase}/tax`)
            .then((res) => (this.tax = res.data)),
        axios
            .get(`${this.apibase}/totalPrice`)
            .then((res) => (this.cartTotal = res.data)),
        axios
            .get(`${this.apibase}/getCartItems`)
            .then((res) => (this.cartItems = res.data))
      ]);
    },
    removeProduct(name) {
      axios
          .delete(`${this.apibase}/remove-product/${name}`)
          .then(this.fetchCart);
    },
    addProduct() {
      axios
          .post(`${this.apibase}/add-product`, this.newProduct)
          .then(this.fetchCart);
          this.newProduct = {name: "", price: "", quantity: ""}; // teeb seisu selliseks peale toote lisamist
    }
  },
  mounted() {
    this.fetchCart();
  },
};

</script>

<style>


</style>
