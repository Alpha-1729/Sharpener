import { createStore } from 'redux';

const counterReducer = (state = { counter: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENTBY5':
            return { counter: state.counter + 5 };
        case 'DECREMENTBY5':
            return { counter: state.counter - 5 };
        default:
            return state;
    }
};

const store = createStore(counterReducer);

export default store;
