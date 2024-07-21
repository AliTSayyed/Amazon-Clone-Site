import {formatCurrency} from '../../scripts/utils/money.js';

// describe function creates a test suite in jasmine
// can use the describe function inside a describe function to further organize the tests
describe('test suite: formatCurrency', () => {
  it('converts cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95'); // allows us to compare values from jasmine
  }); // it functions creates a test in jasmine

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

  it('rounds down to the nearest cent', () => {
    expect(formatCurrency(2000.4)).toEqual('20.00');
  });

}); 