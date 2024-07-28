import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
//import { loadCartFetch } from "../data/cart.js";

async function loadPage(){ // short cut notation for creating a promise
  try {
    await loadProductsFetch(); // await lets us write asynchronous code like normal code, only works on promises.
    renderOrderSummary();
    renderPaymentSummary();
  } catch (error) {
    console.log('Unexpected error. Please try again later.' + error);
  }
}

loadPage();
 
/*
// Use Promise.all to run multiple promises before moving onto the code you want to run
Promise.all([
  loadProductsFetch(), 
  new Promise((resolve) => { 
    loadCart(() => {
      resolve();
    });
  })

]).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});

*/

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
