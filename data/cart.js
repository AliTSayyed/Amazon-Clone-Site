// when add to cart it pressed, items are added to the cart list as objects containing an ID and a quantity. 
export const cart = [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2
}, {
  productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}];

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
      quantity: 1
    });
  }
}