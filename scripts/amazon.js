// Import the cart variable without needing to create a script tag in the html. '../' refers to exiting the current file and going to the main folder. 
// Importing modules helps avoid naming conflicts.
import { cart } from '../data/cart.js';

// store the data for each product as objects in a list (list is in the data/products.js file)

// create a var to hold the string of all the product's html
let productsHTMl = '';

// loop through each product in the product list and generate html for each product 
products.forEach((product) => {
  productsHTMl += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

// use the dom to modify the html with the generated product's html
document.querySelector('.js-products-grid').innerHTML = productsHTMl;

// use the dom to add an event listener when add to cart is pressed 
// use querySelectorAll since there will be a list of add to cart buttons (for each product)
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      // each time a button is pressed, save the name of the product to the cart
      // use the data- attribute in html to get the product ID for any add to cart button pressed. 
      const productId = button.dataset.productId;

      // set undefinded var if item already exists in the cart (do not want to add it again to the cart)
      let matchingItem;

      // check if product is already in the cart array
      // the cart array variable is from the data/cart.js file
      cart.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });

      // increment the quantity of the item if it is already in the cart
      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        // if the product is not in the cart, add it. 
        cart.push({
          productId: productId,
          quantity: 1
        });
      }

      // update the amount of items displyed on the cart icon (top right of the page)
      let cartQuantity = 0;
      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });

      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    });
  });