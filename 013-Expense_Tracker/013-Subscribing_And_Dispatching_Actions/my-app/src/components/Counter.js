import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();

  const incrementHandler = () => {
    dispatch({ type: 'INCREMENTBY5' });
  }

  const decrementHandler = () => {
    dispatch({ type: 'DECREMENTBY5' });
  }
  const toggleCounterHandler = () => { };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementHandler}>IncrementBy5</button>
        <button onClick={decrementHandler}>DecrementBy5</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
