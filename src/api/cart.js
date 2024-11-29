import axios from "axios";

const apibase = "http://localhost:8080/api/cart";

export const fetchCartItems = () => axios.get(`${apibase}/getCartItems`);
export const fetchCartTotal = () => axios.get(`${apibase}/totalPrice`);
export const fetchTax = () => axios.get(`${apibase}/tax`);
export const fetchCartTotalWithTax = () =>
    axios.get(`${apibase}/calculate-tax-total`);

export const addProductToCart = (product) =>
    axios.post(`${apibase}/add-product`, product);

export const removeProductFromCart = (name) =>
    axios.delete(`${apibase}/remove-product/${name}`);