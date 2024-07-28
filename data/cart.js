// function to create a cart from local storage
export let cart = [];

// create a list of objects that contain productId and the quanity of product to add to cart
export let productQuantities = [];

loadFromStorage();

export function loadFromStorage() {
  // when add to cart it pressed, items are added to the cart list as objects containing an ID and a quantity. 
  // the cart should contain the local storage cart items, need to parse the JSON string back to a list data. 
  cart = JSON.parse(localStorage.getItem('cart')) || [];

  /* if the cart is null then give it this default items
  if (!cart) {
    cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
  } 
    */
}

// use local storage to save the cart
// Json will stringify the cart so it can be saved to storage
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// calculate how many items are in the cart (sum of the quantity of each unique item in the cart)
export function numberOfCartItems() {
  let numberOfItems = 0;
  cart.forEach((cartItem) => {
  numberOfItems += cartItem.quantity;
  });
  
  return numberOfItems;
}

export function addToCart(productId) {
  // set undefinded var if item already exists in the cart (do not want to add it again to the cart)
  let matchingItem;
  // set undefined var to determine how much of the product to add to the cart. 
  let quantityProduct;

  // determine the quantity to add based on what the customer selected for each product. 
  productQuantities.forEach((product) => {
    if (product.productId === productId){
      quantityProduct = product.quantityToAdd;
    } else {
      quantityProduct = 1;
    }
  });

  // check if product is already in the cart array
  // the cart array variable is from the data/cart.js file
  
    cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  

  // increment the quantity of the item if it is already in the cart
  if (matchingItem) {
    matchingItem.quantity += Number (quantityProduct) || 1;
  } else {
    // if the product is not in the cart, add it. Must use a Number type cast to avoid string concatenation. 
    cart.push({
      productId: productId,
      quantity: Number (quantityProduct) || 1,
      deliveryOptionId: '1'
    });
  }
  // save updated cart to local storage
  saveToStorage();
}

// when the delete button is pressed on the checkout page, use this function to remove the item from the cart 
export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  // save updated cart to local storage
  saveToStorage();
}

// create ability to update delivery when a new option is selected 
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  // save updated cart's delivery ID to local storage
  saveToStorage();
}

// clear the cart after an order is placed
export function clearCart(){
  cart = [];
  saveToStorage();
}

export function updateFromCart(productId){
  let matchingItem;
  // Find the product in the cart 
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  // update the quantity by 1
  matchingItem.quantity++;
  
  // save updated cart to local storage
  saveToStorage();
  return matchingItem.quantity;
}


/* use a fetch to create a loadCart promise instead of a call back
export function loadCartFetch() {
  const promise = fetch('https://supersimplebackend.dev/cart').then((response) => {
       return response.text(); // gets the json cart data from the backend 
  }).then((cartData) =>{
    console.log(cartData);
  }).catch((error) => {
    console.log('Unexpected error. Please try again later. ' + error); // use a catch if there is an error 
  }); // fetch creates a promise 
  return promise;
}
*/

/* load cart from backend (doesnt do anything other than print load cart to console but would be used to store the list of products in the cart)
export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun(); // run the function paramater 
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart')
  xhr.send();
}
*/