import React from 'react';

const CartContext = React.createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    updateItem: (item) => { }
});

export default CartContext;