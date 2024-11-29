<template>
  <div class="container mt-4 vintage-style">
    <h1 class="text-center mb-4 title-text">Shopping Cart</h1>
    <h3 class="section-header">Add Product</h3>
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

    <h3 class="section-header">Cart Items</h3>
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
          <button @click="removeProduct(item.name)" class="btn btn-danger btn-sm action-button">Remove</button>
        </td>
      </tr>
      </tbody>
    </table>

    <div class="summary-container">
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    apibase: "http://localhost:8080/api/cart",
    cartTotalWithTax: 0,
    tax: 0.0,
    cartTotal: 0,
    cartItems: [],
    newProduct: {
      name: "",
      price: "",
      quantity: ""
    },
  }),
  methods: {
    fetchCart() {
      axios.all([
        axios.get(`${this.apibase}/calculate-tax-total`).then((res) => (this.cartTotalWithTax = res.data)),
        axios.get(`${this.apibase}/tax`).then((res) => (this.tax = res.data)),
        axios.get(`${this.apibase}/totalPrice`).then((res) => (this.cartTotal = res.data)),
        axios.get(`${this.apibase}/getCartItems`).then((res) => (this.cartItems = res.data))
      ]);
    },
    removeProduct(name) {
      axios.delete(`${this.apibase}/remove-product/${name}`).then(this.fetchCart);
    },
    addProduct() {
      axios.post(`${this.apibase}/add-product`, this.newProduct).then(this.fetchCart);
      this.newProduct = { name: "", price: "", quantity: "" };
    }
  },
  mounted() {
    this.fetchCart();
  },
};
</script>

<style>
/* General Styling */
body {
  background: linear-gradient(135deg, #f9efe7, #eddcd2);
  font-family: 'Cormorant Garamond', serif;
}

/* Vintage Style Container */
.vintage-style {
  background: linear-gradient(135deg, #fff8f0, #f6e5d6);
  border: 2px solid #d5b59c;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

/* Title Text */
.title-text {
  font-family: 'Playfair Display', serif;
  color: #b87a56;
  text-shadow: 2px 2px 5px rgb(255, 255, 255);
  font-size: 2.5rem;
  letter-spacing: 1px;
}

/* Section Headers */
.section-header {
  font-family: 'Cinzel', serif;
  color: #8b5e34;
  text-transform: uppercase;
  margin-bottom: 20px;
  font-size: 1.5rem;
  border-bottom: 2px solid #c9a789;
  display: inline-block;
}

/* Input Styling */
.input-style {
  margin-right: 15px;
  border: 1px solid #dac3b3;
  border-radius: 8px;
  background-color: #fffefc;
  padding: 8px;
  font-size: 1rem;
  color: #7d5e3e;
}

.input-style:focus {
  outline: none;
  border-color: #c96e50;
  box-shadow: 0 0 8px rgba(201, 110, 80, 0.6);
}

/* Button Styling */
.button-style {
  background: linear-gradient(135deg, #e89c80, #d67157);
  color: #fff;
  font-weight: bold;
  border-radius: 10px;
  border: none;
  padding: 10px;
}

.button-style:hover {
  background: linear-gradient(135deg, #d67157, #c45a45);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

/* Table Styling */
.vintage-table {
  background: #fdf7ef;
  border: 2px solid #d6bfa5;
  border-radius: 10px;
  overflow: hidden;
}

.vintage-table th {
  background: linear-gradient(135deg, #d5b59c, #bca083);
  color: #bca083;
  text-align: center;
  font-weight: normal;
  font-size: 1.1rem;
}

.vintage-table td {
  color: #7d5e3e;
  text-align: center;
  vertical-align: middle;
}

.vintage-table tbody tr:hover {
  background: #f6e5d6;
}

/* Action Button */
.action-button {
  background-color: #e86a62;
  border-radius: 5px;
  border: none;
  color: white;
  padding: 5px 10px;
}

.action-button:hover {
  background-color: #c45450;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}

/* Summary Section */
.summary-container {
  background: linear-gradient(135deg, #fae3d0, #f8d5bf);
  border: 2px solid #d5b59c;
  border-radius: 10px;
  padding: 15px;
  margin-top: 20px;
}

.summary-container h3 {
  font-family: 'Cinzel', serif;
  color: #8b5e34;
  font-weight: bold;
  margin: 0;
}
</style>