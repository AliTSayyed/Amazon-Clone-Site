import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from '../../data/cart.js';
import { loadProducts } from "../../data/products.js";

// 1. test how the page looks
// 2. test how the page behaves 
describe('test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  // done function makes the hook wait for the inner function to finish before being able to move on to the next lines of code
  // need to wait for the products to actually load before moving on to next lines of code
  beforeAll((done)=>{
    loadProducts(() =>{
      done(); // waits for loadProducts to finish
    });
  });

  // before each hook function runs prerequisite code before the actual tests can be done 
  beforeEach(() => {
    // make sure the actual local storage does not get modified when an item is removed 
    spyOn(localStorage, 'setItem');
    // create this tag in the inner html so the renderOrderSummary's inner dom can find this tag and add the html to it 
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;
    
    // do not want the actual local storage cart to affect the html of this test. Use a mock local storage
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });  
    loadFromStorage(); 
    
    // now run the render order summary function
    renderOrderSummary();
  });

  // after each hook runs code after the end of the tests. Good for cleaning up the html 
  afterEach(() => {
    // resets the html at the end of the test to nothing 
    document.querySelector('.js-test-container').innerHTML = ``;
  })
  
  it('displays the cart', () => {
    // now run tests
    // checks if 2 cart item elements were added to the html
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2'); // as long as the text produced contians Quantity: 2, the test passes.
    
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');

  });

  it('removes a product', () => {
    // this will click delete on the dom and should remove an item
    document.querySelector(`.js-delete-link-${productId1}`).click();

    // now run tests
    // expect to now have only 1 item in the cart. 
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

    // expect the first cart item to be null on the page
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);

    // expect the second cart item to not be null 
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    // expect the cart to now have 1 item and that item is the second product. 
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

  });
});