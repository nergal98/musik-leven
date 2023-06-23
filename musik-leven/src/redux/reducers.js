import { SET_EVENTS_PER_PAGE } from './actions';

const initialState = {
  eventsPerPage: 5
}

export const eventsReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_EVENTS_PER_PAGE:
      return {
        ...state,
        eventsPerPage: action.payload
      }
    default:
      return state;
  }
}