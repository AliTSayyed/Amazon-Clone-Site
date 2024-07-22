import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import'../data/cart-class.js'; // runs everything in this file without calling an item to import 
//import '../data/backend-practice.js';
 
// Use Promise.all to run multiple promises before moving onto the code you want to run
Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve('value1');
    });
  }), 
  new Promise((resolve) => { 
    loadCart(() => {
      resolve();
    });
  })

]).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});



/*
// use built in class promise for asynchronous code
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });

}).then(() => {
  return new Promise((resolve) => { // return a new promise if you need to wait again for a response before moving onto the next line of code
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  // runs the renderOrderSummary() and renderPaymentSummary() after all the products are loaded from the backend 
  renderOrderSummary();
  renderPaymentSummary();
});
*/
