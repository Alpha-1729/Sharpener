import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import CartContext from '../../../store/cart-context';
import { useContext } from 'react';

function MealItemForm(props) {

    const cartCtx = useContext(CartContext);
    function addItemToCart(event) {
        event.preventDefault();
        const qty = document.getElementById("amount_" + props.id).value;
        const item = { ...props.item, amount: +qty };
        cartCtx.addItem(item);
    }


    return (
        <form className={classes.form}>
            <Input label="Amount" input={{
                id: "amount_" + props.id,
                type: "number",
                min: "1",
                max: "5",
                step: "1",
                defaultValue: "1"
            }} />
            <button onClick={addItemToCart}> + Add</button>
        </form >
    );
};

export default MealItemForm;