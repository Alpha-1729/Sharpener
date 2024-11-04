import React from 'react';
import ExpenseItem from './ExpenseItem';
import './ExpensesList.css';

function ExpensesList(props) {
    let expenseMessage = '';
    if (props.items.length === 0) {
        return <h2 className='expenses-list__fallback'> No expenses found</h2>;
    } else if (props.items.length === 1) {
        expenseMessage = <h2 className='expenses-list__fallback'>Only one expense here. Please add more </h2>;
    }

    return (<ul className='expense-list'>
        {props.items.map((item) => {
            return (<ExpenseItem key={item.id}
                title={item.title}
                date={item.date}
                price={item.price} />);
        })}
        {expenseMessage};
    </ul>);
}

export default ExpensesList;