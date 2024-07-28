import { orders } from "../data/orders.js";
import formatCurrency from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getProducts, loadProductsFetch } from '../data/products.js';
import { cart, addToCart} from '../data/cart.js';

// use fetch to load products then display the orders
loadProductsFetch().then(() => {
  renderOrderspage();
});

// function to display the products on a page 
function renderOrderspage() {
  // show empty orders if no orders are placed
  if (orders === null || orders.length === 0) {
    let emptyOrdersHTML = `
      <div class="empty-orders-center-wrapper">
        <div class="empty-orders-center-container">
          <div class="empty-page-title">No Orders Placed</div>
          <div><img class="empty-cart-image" src="images/icons/empty-cart-icon.png"></div>
          <a class="back-to-shop-link" href="amazon.html">
            <button class="button-primary">Back to Shopping</button>
          </a>
        </div>
      </div>
    `;
    document.querySelector('.js-main').innerHTML = emptyOrdersHTML;
    document.querySelector('.js-cart-quantity').innerHTML = cart.length;
  } else { // show orders if orders are placed
    document.querySelector('.js-main').innerHTML = `
      <div class="page-title">Your Orders</div>
      <div class="orders-grid js-order-grid">`;
  
    // create the html header for each order in the orders list. 
    let ordersHTML = ``;
    orders.forEach((order) => {
      
      const dateString = dayjs(order.orderTime).format('MMMM D');

      ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${dateString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid">
          `;

      // create the html body for each product in each order 
      order.products.forEach((product) => {
       
        // get the product information from the backend to display on the page
        const orderedProduct = getProducts(product.productId);
        // order's product array has quantity and estimated delivery 
        const dateString = dayjs(product.estimatedDeliveryTime).format('MMMM D');

        ordersHTML += `
              <div class="product-image-container">
                <img src="${orderedProduct.image}">
              </div>

              <div class="product-details">
                <div class="product-name">
                  ${orderedProduct.name}
                </div>
                <div class="product-delivery-date">
                  Arriving on: ${dateString}
                </div>
                <div class="product-quantity">
                  Quantity: ${product.quantity}
                </div>
                <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${product.productId}">
                  <img class="buy-again-icon" src="images/icons/buy-again.png">
                  <span class="buy-again-message">Buy it again</span>
                </button>
              </div>

              <div class="product-actions">
                <a href="tracking.html">
                  <button class="track-package-button button-secondary">
                    Track package
                  </button>
                </a>
              </div>
                `;
      });

      // add divs to close the order container tag and order grid tag after the final product's html is added 
      ordersHTML += `
        </div>
          </div>
          </div>
            </div>
              `;
    });

    // for each order stored in the backend, create the html for the order and the products. 
    document.querySelector('.js-order-grid').innerHTML = ordersHTML;

    // update the number of items in the cart after ordering (should be 0)
    document.querySelector('.js-cart-quantity').innerHTML = cart.length;
  }

  // make the buy it again button functional by adding 1 of the same item to the cart, and then redirecting to the cart. 
  document.querySelectorAll('.js-buy-again-button')
    .forEach((button) => {
      const productId = button.dataset.productId;
      button.addEventListener('click', () => {
        addToCart(productId);
        window.location.href = 'checkout.html' // take customer back to checkout page
      });
    });
}