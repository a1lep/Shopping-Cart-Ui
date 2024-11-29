<template>
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
</template>

<script>
export default {
  props: ["cartTotal", "tax", "cartTotalWithTax"],
};
</script>