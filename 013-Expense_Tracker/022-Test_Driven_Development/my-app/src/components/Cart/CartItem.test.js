import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CartItem from './CartItem';
import { cartActions } from '../../store/cartSlice';

const mockStore = configureStore([]);

describe('CartItem Component', () => {
  let store;
  let mockDispatch;

  beforeEach(() => {
    store = mockStore({});
    mockDispatch = jest.fn();
    store.dispatch = mockDispatch; // Mock the store's dispatch function
  });

  const testItem = {
    id: 'p1',
    title: 'Test Item',
    quantity: 2,
    total: 40,
    price: 20,
  };

  test('Renders the cart item title', () => {
    render(
      <Provider store={store}>
        <CartItem item={testItem} />
      </Provider>
    );

    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  test('Renders the cart item quantity', () => {
    render(
      <Provider store={store}>
        <CartItem item={testItem} />
      </Provider>
    );
    expect(screen.getByText('x')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('Renders the cart item total price', () => {
    render(
      <Provider store={store}>
        <CartItem item={testItem} />
      </Provider>
    );

    expect(screen.getByText('$40.00')).toBeInTheDocument();
  });

  test('Renders the cart item price per unit', () => {
    render(
      <Provider store={store}>
        <CartItem item={testItem} />
      </Provider>
    );

    expect(screen.getByText('($20.00/item)')).toBeInTheDocument();
  });

  test('Dispatches addItemToCart action on "+" button click', () => {
    render(
      <Provider store={store}>
        <CartItem item={testItem} />
      </Provider>
    );

    const addButton = screen.getByText('+');
    fireEvent.click(addButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      cartActions.addItemToCart({ id: 'p1', title: 'Test Item', price: 20 })
    );
  });

  test('Dispatches removeItemFromCart action on "-" button click', () => {
    render(
      <Provider store={store}>
        <CartItem item={testItem} />
      </Provider>
    );

    const removeButton = screen.getByText('-');
    fireEvent.click(removeButton);

    expect(mockDispatch).toHaveBeenCalledWith(cartActions.removeItemFromCart('p1'));
  });

  test('Does  render a price when total is zero', () => {
    const zeroPriceItem = { ...testItem, total: 0 };
    render(
      <Provider store={store}>
        <CartItem item={zeroPriceItem} />
      </Provider>
    );

    expect(screen.queryByText('$0.00')).toBeInTheDocument();
  });

  test('Renders the correct quantity even if it is 1', () => {
    const singleItem = { ...testItem, quantity: 1 };
    render(
      <Provider store={store}>
        <CartItem item={singleItem} />
      </Provider>
    );

    // Check if both 'x' and '1' are rendered correctly
    expect(screen.getByText('x')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });


  test('Does not dispatch any actions if buttons are not clicked', () => {
    render(
      <Provider store={store}>
        <CartItem item={testItem} />
      </Provider>
    );

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  test('Renders the component with a different title correctly', () => {
    const newTitleItem = { ...testItem, title: 'New Test Item' };
    render(
      <Provider store={store}>
        <CartItem item={newTitleItem} />
      </Provider>
    );

    expect(screen.getByText('New Test Item')).toBeInTheDocument();
  });
});
