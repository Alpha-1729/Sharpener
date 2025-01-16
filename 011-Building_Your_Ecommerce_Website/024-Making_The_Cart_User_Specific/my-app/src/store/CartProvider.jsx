import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: []
}

const cartReducer = (state, action) => {
    let updatedCartItems;
    switch (action.type) {
        case 'ADD':
            updatedCartItems = state.items.concat(action.item);
            return { items: updatedCartItems };
        case 'REMOVE':
            updatedCartItems = state.items.filter(item => item.id !== action.id);
            return { items: updatedCartItems };
        case 'UPDATE':
            updatedCartItems = state.items.map(item => item.id === action.item.id ? action.item : item);
            return { items: updatedCartItems };
        case 'SET':
            return { items: action.items };
        default:
            return state;

    }
};

function CartProvider(props) {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item: item })
    };
    const removeCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', id: id });
    };
    const updateCartHandler = (item) => {
        dispatchCartAction({ type: 'UPDATE', item: item });
    };
    const setCartHandler = (items) => {
        dispatchCartAction({ type: 'SET', items: items });
    };

    const cartContext = {
        items: cartState.items,
        addItem: addCartHandler,
        removeItem: removeCartHandler,
        updateItem: updateCartHandler,
        setItem: setCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )

}

export default CartProvider;