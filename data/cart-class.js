// Better way of oop, create a class that has properties and methods
class Cart {
  cartItems;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    // runs the default case of the method when object is created. loads cart with default items. 
    this.loadFromStorage();
  }

  loadFromStorage() {
    // when add to cart it pressed, items are added to the cart list as objects containing an ID and a quantity. 
    // the cart should contain the local storage cart items, need to parse the JSON string back to a list data. 
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));

    // if the cart is null then give it this default items
    if (!this.cartItems) {
      this.cartItems = [{
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
  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    // set undefinded var if item already exists in the cart (do not want to add it again to the cart)
    let matchingItem;

    // check if product is already in the cart array
    // the cart array variable is from the data/cart.js file
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    // increment the quantity of the item if it is already in the cart
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      // if the product is not in the cart, add it. 
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
    // save updated cart to local storage
    this.saveToStorage();
  }

  // when the delete button is pressed on the checkout page, use this function to remove the item from the cart 
  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
    // save updated cart to local storage
    this.saveToStorage();
  }

  // create ability to update delivery when a new option is selected 
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    // save updated cart's delivery ID to local storage
    this.saveToStorage();
  }

}


const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-buisness');

console.log(cart);
console.log(businessCart);