import { createStore } from 'redux';
import { combinedReducer } from './reducers';

export const store = createStore(combinedReducer);