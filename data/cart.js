// function to create a cart from local storage
export let cart;
loadFromStorage();
export function loadFromStorage() {
  // when add to cart it pressed, items are added to the cart list as objects containing an ID and a quantity. 
  // the cart should contain the local storage cart items, need to parse the JSON string back to a list data. 
  cart = JSON.parse(localStorage.getItem('cart'));

  // if the cart is null then give it this default items
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
}

// use local storage to save the cart
// Json will stringify the cart so it can be saved to storage
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  // set undefinded var if item already exists in the cart (do not want to add it again to the cart)
  let matchingItem;

  // check if product is already in the cart array
  // the cart array variable is from the data/cart.js file
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  // increment the quantity of the item if it is already in the cart
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    // if the product is not in the cart, add it. 
    cart.push({
      productId: productId,
      quantity: 1,
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

// load cart from backend

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun(); // run the function paramater 
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart')
  xhr.send();
}
