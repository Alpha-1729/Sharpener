import { uiActions } from "./uiSlice";
import { cartActions } from "./cartSlice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://react-http-2549b-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json');

            if (!response.ok) {
                throw new Error('Failed to get cart data!');
            }

            const data = await response.json();

            return data;
        }

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || {},
                totalQuantity: cartData.totalQuantity,
            }));
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Failed to get cart data!',
                })
            );
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'loading',
                title: 'Sending...',
                message: 'Your cart data is being sent!',
            })
        );

        const sendRequest = async () => {
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
        }

        try {
            await sendRequest();
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

        setTimeout(() => {
            dispatch(uiActions.clearNotification());
        }, 2000);
    }
}