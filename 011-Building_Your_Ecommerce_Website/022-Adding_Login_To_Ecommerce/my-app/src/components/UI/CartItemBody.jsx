import React, { useState } from "react";
import { Button } from "react-bootstrap";

function CartItemBody({ cartElements }) {
    const [cartItems, setCartItems] = useState(cartElements);

    const handleQuantityChange = (index, event) => {
        const newCartItems = [...cartItems];
        newCartItems[index].quantity = event.target.value;
        setCartItems(newCartItems);
    };

    const handleRemoveItem = (index) => {
        const newCartItems = cartItems.filter((_, itemIndex) => itemIndex !== index);
        setCartItems(newCartItems);
    };
    return (
        <tbody>
            {cartItems.map((item, index) => (
                <tr key={index}>
                    <td><img src={item.imageUrl} alt={item.title} style={{ width: '50px' }} /></td>
                    <td>{item.price}</td>
                    <td>
                        <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(index, e)}
                            min="1"
                            style={{ width: '60px' }}
                        />
                    </td>
                    <td>
                        <Button variant="danger" onClick={() => handleRemoveItem(index)}>
                            Remove
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
    );
}

export default CartItemBody