// creating the checkout page 
import { cart, removeFromCart, updateDeliveryOption, numberOfCartItems, updateFromCart } from '../../data/cart.js'; // named export
import { getProducts } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; // default export does not need {}
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { emptyCheckout } from '../checkout.js';

// run all the code with this function
export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProducts(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
            ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  // create html for delivery options based on the current date and option selected
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    });
    return html;
  }

  // use the dom to add the cart html to the page
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  // use the dom to make all delete links functional
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);

        // first remove item from cart, then remove item from page using the dom. Remove the div that starts the html. 
        const contianer = document.querySelector(`.js-cart-item-container-${productId}`);
        contianer.remove();

        // if the last item in the cart was removed, then show the empty checkout page. 
        if (cart === null || cart.length === 0) {
          emptyCheckout();
        } else {
          // update the payment summary when an item is deleted from the cart.
          renderPaymentSummary();
          // Update how many items are in the cart at the top of the checkout 
          headerItemCount();
        }
      });
    });

  // use the dom to update the delivery option of the cart item when a new delivery option is selected 
  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        // run entire code again with the updated cart properties and payment summary (will update all the html)
        renderOrderSummary();
        // update the payment summary when a delivery option is changed. 
        renderPaymentSummary();
      });
    });

  // use the dom to update the amount of items in the checkout 
  function headerItemCount() {
    const numOfItems = numberOfCartItems();

    document.querySelector('.js-checkout-header-middle-section')
      .innerHTML = `
      Checkout (<a class="return-to-home-link"
            href="amazon.html">${numOfItems} items</a>)
            `;
  }
  headerItemCount();

  // use the dom to make all update links functional. Increases the quantity by 1 when pressed. 
  document.querySelectorAll('.js-update-link')
    .forEach((link) => {
      const productId = link.dataset.productId;
      link.addEventListener('click', () => {
        const newQuantity = updateFromCart(productId);
        // update the payment summary when an item is deleted from the cart.
        renderPaymentSummary();
        // Update how many items are in the cart at the top of the checkout 
        headerItemCount();
        // update the quantity label next to the update link
        document.querySelector('.js-quantity-label').innerHTML = newQuantity;
      });
    });
}
