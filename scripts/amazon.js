// Importing variables without needing to create a script tag in the html. '../' refers to exiting the current file and going to the main folder. 
// Importing modules helps avoid naming conflicts.
import { addToCart, productQuantities, numberOfCartItems } from '../data/cart.js';
import { products, loadProductsFetch } from '../data/products.js';
// import { formatCurrency } from './utils/money.js';

// load the data for each product as objects in a list (list is from backend).
// loadProducts(renderProductsGrid);

// use fetch to load page 
loadProductsFetch().then(() => {
  renderProductsGrid();
});

function renderProductsGrid() {

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
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-product-quantity-selector" data-product-id="${product.id}">
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

        ${product.extraInfoHTML()}
        
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

  // initial case of default items set in cart, make the cart show how many items are already there. 
  const numOfItems = numberOfCartItems();
  document.querySelector('.js-cart-quantity').innerHTML = numOfItems;

  function updateCartQuantity() {
    // update the amount of items displyed on the cart icon (top right of the page)
    let cartQuantity = numberOfCartItems();

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }

  // use the dom to add an event listener when add to cart is pressed 
  // use querySelectorAll since there will be a list of add to cart buttons (for each product)
  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        // each time a button is pressed, save the ID of the product to the cart
        // use the data- attribute in html to get the product ID for any add to cart button pressed. 
        const productId = button.dataset.productId;

        // call functions to add to cart and update cart quantity
        addToCart(productId);
        updateCartQuantity();
      });
    });

  //use the dom to add multiple quantities of an item to the cart when using the select element
  document.querySelectorAll('.js-product-quantity-selector')
    .forEach((selector) => {
      selector.addEventListener('change', (quantity) => {
        const productId = selector.dataset.productId;
        const quantityToAdd = quantity.target.value;
        // if the productQuantities list is empty, add the first selected quantitiy item to the list. 
        if (productQuantities.length === 0) {
          productQuantities.push({ productId, quantityToAdd });
        }
        // for each item on the list of productQuantities, update the new quantity to add or add the new product quanitity to the list  
        productQuantities.forEach((product) => {
          if (product.productId === productId) {
            product.quantityToAdd = quantityToAdd;
          } else {
            productQuantities.push({ productId, quantityToAdd });
          }
        });
      });
    });

  // make the search bar functional
  const searchInput = document.querySelector('.js-search-bar');
  searchInput.addEventListener("input", text => {
    let value = text.target.value; // value is the pressed key
    // hide each product displayed on the product grid whose product name element is not in the search input.
    const productsGrid = document.querySelectorAll('.product-container');
    productsGrid.forEach((product) => {
      const productName = product.querySelector('.product-name').textContent.toLowerCase(); // Get the product name and convert to lowercase
      const isVisible = productName.includes(value);
      product.classList.toggle('hide', !isVisible);
    });
  });

}

