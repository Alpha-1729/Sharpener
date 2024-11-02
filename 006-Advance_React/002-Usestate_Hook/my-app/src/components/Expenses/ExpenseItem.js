// Write your code at the relevant places in the code below
import { useState } from 'react';
import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

function ExpenseItem(props) {
    const [title, setTitle] = useState(props.title);
    function buttonClickHandler(event) {
        setTitle("New Title");
    }

    return (
        <Card className="expense-item">
            <ExpenseDate date={props.date} />
            <div className="expense-item__description">
                <h2>{title}</h2>
                <div className="expense-item__price">${props.price}</div>
            </div>
            <button onClick={buttonClickHandler}>Change Title</button>
        </Card>

    );
}

export default ExpenseItem;
