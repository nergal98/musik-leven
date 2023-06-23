import { createStore } from 'redux';
import { eventsReducer } from './reducers';

export const store = createStore(eventsReducer);