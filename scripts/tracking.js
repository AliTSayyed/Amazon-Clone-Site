import { orders } from "../data/orders.js";
import { getProducts, loadProductsFetch } from '../data/products.js';
import { numberOfCartItems } from "../data/cart.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

// use fetch to load products then display tracking the item 
loadProductsFetch().then(() => {
  renderTrackingPage();
});

function renderTrackingPage() {
  const url = new URL(window.location.href);
  const urlOrderId = url.searchParams.get('orderId');
  const urlProductId = url.searchParams.get('productId');

  // search through orders to find the matching order (to display estimated delivery and quantity)
  let matchingOrder;
  orders.forEach((order) => {
    if (order.id === urlOrderId) {
      matchingOrder = order;
    }
  });

  // search through products to find the matching product (to display product name and image)
  const matchingProduct = getProducts(urlProductId);

  let dateString;
  let productQuantity;
  matchingOrder.products.forEach((product) => {
    if (product.productId === matchingProduct.id) {
      productQuantity = product.quantity;
      dateString = dayjs(product.estimatedDeliveryTime).format('MMMM, D');
    }
  });
 
  // display the correct tracking details based on the order and product that was selected 
  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${dateString}
    </div>

    <div class="product-info">
      ${matchingProduct.name}
    </div>

    <div class="product-info">
      Quantity: ${productQuantity}
    </div>

    <img class="product-image" src="${matchingProduct.image}">

    <div class="progress-labels-container">
      <div class="progress-label js-progress-label-preparing">
        Preparing
      </div>
      <div class="progress-label js-progress-label-shipped">
        Shipped
      </div>
      <div class="progress-label js-progress-label-delivered">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar js-progress-bar"></div>
    </div>
  </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;

  // display the correct cart quantity
  document.querySelector('.js-cart-quantity').innerHTML = numberOfCartItems();

  // animate the progress bar
  const progressBar = document.querySelector('.js-progress-bar');
  // animate the progress labels
  const labels = {
    preparing: document.querySelector('.js-progress-label-preparing'),
    shipped: document.querySelector('.js-progress-label-shipped'),
    delivered: document.querySelector('.js-progress-label-delivered')
  };

  // toggle the green color (current-status) based on the width of the progres bar
  const updateLabels = () => {
    const width = parseFloat(getComputedStyle(progressBar).width) / progressBar.parentElement.clientWidth * 100;
    labels.preparing.classList.toggle('current-status', width <= 45);
    labels.shipped.classList.toggle('current-status', width > 45 && width <= 90);
    labels.delivered.classList.toggle('current-status', width > 90);
  }

  // Set the progress bar width and start the animation
  setTimeout(() => {
    // change the width to 100% (the transition style in css is set to 7seconds)
    progressBar.style.width = '100%';
    // Check progress every 100ms
    const interval = setInterval(() => {
      updateLabels(); 
      // Continue checking while the width is less than 100% 
      const currentWidth = parseFloat(getComputedStyle(progressBar).width);
      if (currentWidth === progressBar.parentElement.clientWidth) { // stop when progress bar is at 100%
        clearInterval(interval);
      }
    }, 100);
  }, 100);
}





