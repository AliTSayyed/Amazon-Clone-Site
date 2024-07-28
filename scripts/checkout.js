import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart.js";
//import { loadCartFetch } from "../data/cart.js";

// load empty cart and go back to shopping if cart is empty
if (cart === null || cart.length === 0){
  // set middle header to 0
  document.querySelector('.js-checkout-header-middle-section')
  .innerHTML = ` Checkout (<a class="return-to-home-link" href="amazon.html">0 items</a>) `;
  // remove current js-main html from checkout.html
  document.querySelector('.js-main').innerHTML = ``;
  let emptyOrdersHTML = `
  <div class="empty-cart-center-wrapper">
    <div class="empty-orders-center-container">
      <div class="empty-page-title">Cart is Empty</div>
      <div><img class="empty-cart-image" src="images/icons/empty-cart-icon.png"></div>
      <a class="back-to-shop-link" href="amazon.html">
        <button class="button-primary">Back to Shopping</button>
      </a>
    </div>
  </div>
`;
// update js-main with the empty cart html
document.querySelector('.js-main').innerHTML = emptyOrdersHTML;
} else { // show order and payment summary if cart is not empty
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
}
 

/* IGNORE
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
