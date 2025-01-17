import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
  const counter = useSelector(state => state.counter);
  const show = useSelector(state => state.showCounter);

  const dispatch = useDispatch();

  const increaseHandler = () => {
    dispatch({ type: 'increase', amount: 2 });
  }

  const decreaseHandler = () => {
    dispatch({ type: 'decrease', amount: 2 });
  }

  const toggleCounterHandler = () => {
    dispatch({ type: 'toggle' });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={increaseHandler}>IncrementBy2</button>
        <button onClick={decreaseHandler}>DecrementBy2</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
