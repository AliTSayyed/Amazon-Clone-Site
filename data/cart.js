// when add to cart it pressed, items are added to the cart list as objects containing an ID and a quantity. 
export const cart = [];

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