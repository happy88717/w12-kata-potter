import { TestBed } from '@angular/core/testing';
import { OptimalBuy } from './optimalbuy';

describe('OptimalBuy', () => {
  let order: OptimalBuy;
  it('should create an instance', () => {
    expect(new OptimalBuy()).toBeTruthy();
  });
  
  beforeEach(() => {
    order = new OptimalBuy();
  });
  
  test('0-0-0-0-0',() => {          //0 * 8
    order.bookorder_list([]);
    expect(order.price).toBe(0);
  });

  test('1-0-0-0-0',() => {          //1 * 8
    order.bookorder_list([0]);
    expect(order.price).toBe(8);
  });
  test('0-1-0-0-0',() => {          //1 * 8
    order.bookorder_list([1]);
    expect(order.price).toBe(8);
  });
  test('0-0-1-0-0',() => {          //1 * 8
    order.bookorder_list([2]);
    expect(order.price).toBe(8);
  });
  test('0-0-0-1-0',() => {          //1 * 8
    order.bookorder_list([3]);
    expect(order.price).toBe(8);
  });

  test('0-0-0-0-1',() => {          //1 * 8
    order.bookorder_list([4]);
    expect(order.price).toBe(8);
  });

  test('2-0-0-0-0',() => {          //2 * 8
    order.bookorder_list([0,0]);
    expect(order.price).toBe(16);
  });
  test('2-1-0-0-0',() => {          //2 * 8 * 0.95 + 1 * 0.8
    order.bookorder_list([0,0,1]);
    expect(order.price).toBe(23.2);
  });

  test('2-1-1-0-0',() => {           //3 * 8 * 0.9 + 1 * 8 * 0.8
    order.bookorder_list([0,0,1,2]);
    expect(order.price).toBe(29.6);
  });

  test('1-1-0-0-0',() => {            //2 * 8 * 0.95
    order.bookorder_list([0,1]);
    expect(order.price).toBe(15.2);
  });

  test('1-1-1-0-0',() => {            //3 * 8 * 0.9
    order.bookorder_list([0,1,2]);
    expect(order.price).toBe(21.6);
  });

  test('1-1-1-1-0',() => {            //4 * 8 * 0.8
    order.bookorder_list([0,1,2,3]);
    expect(order.price).toBe(25.6);
  });
  test('1-1-1-1-1',() => {            //5 * 8 * 0.75
    order.bookorder_list([0,1,2,3,4]);
    expect(order.price).toBe(30);
  });
  test('2-2-2-1-1',() => {
    order.bookorder_list([0, 0,  1, 1, 2, 2, 3, 4]);
    expect(order.price).toBe(51.2);   //4 * 8 * 0.8 + 4 * 8 * 0.8
  });

  test('5-5-4-5-4',() => {
    order.bookorder_list([0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4]);
    expect(order.price).toBe(141.2);  //3 * (5 * 8 * 0.75) + 2 * (4 * 8 * 0.8)
  });
});
