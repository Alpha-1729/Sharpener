import classes from './MealItem.module.css';

function MealItem(props) {
    const price = `$${props.price.toFixed(2)}`;
    return <li className={classes.meals}>
        <div><h3>{props.name}</h3></div>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
        <hr />
    </li>;
};

export default MealItem;