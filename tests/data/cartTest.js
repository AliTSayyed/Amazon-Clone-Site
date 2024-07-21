import {addToCart, cart, loadFromStorage} from '../../data/cart.js';

describe('test suite: addToCart', () => { 
  it('adds and existing product to the cart', () =>{
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOption: '1'
      }]);
    });  
    loadFromStorage(); 

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); 
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2); // if an existing item is added to cart, only the quantity should change  
  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'setItem'); // make sure adding to cart in the test does not affect the actual cart (mock)
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    }); // make a mock by replacing the local storage cart with an empty string cart. 
    loadFromStorage(); // reload the cart from the updated local storage (now an empty string array)

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); // since we can not check the cart (setItem is not saving to local Storage), then at least check if the function was called. 
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
});