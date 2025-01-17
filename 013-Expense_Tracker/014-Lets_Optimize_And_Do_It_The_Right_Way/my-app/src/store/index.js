import { createStore } from 'redux';

const initialState = { counter: 0, showCounter: true };
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'increase':
            return { counter: state.counter + action.amount, showCounter: state.showCounter };
        case 'decrease':
            return { counter: state.counter - action.amount, showCounter: state.showCounter };
        case 'toggle':
            return { counter: state.counter, showCounter: !state.showCounter };
        default:
            return state;
    }
};

const store = createStore(counterReducer);

export default store;
