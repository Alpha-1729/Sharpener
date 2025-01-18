import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Notification from './components/UI/Notification';
import { uiActions } from './store/uiSlice';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: 'loading',
          title: 'Sending...',
          message: 'Your cart data is being sent!',
        })
      );

      try {
        const response = await fetch(
          'https://react-http-2549b-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
          {
            method: 'PUT',
            body: JSON.stringify(cart),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to send cart data!');
        }

        dispatch(
          uiActions.showNotification({
            status: 'success',
            title: 'Success!',
            message: 'Cart data sent successfully!',
          })
        );
      } catch (error) {
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: 'Failed to send cart data!',
          })
        );
      }

      // Clear notification after 2 seconds
      setTimeout(() => {
        dispatch(uiActions.clearNotification());
      }, 2000);
    };

    if (isInitial) {
      isInitial = false;
      return;
    }
    sendCartData();
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
