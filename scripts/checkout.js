import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
//import'../data/cart-class.js'; // runs everything in this file without calling an item to import 
import '../data/backend-practice.js';
// run the order summary page
renderOrderSummary();

// run the payment summary page 
renderPaymentSummary();