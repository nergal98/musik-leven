import { SET_EVENTS_PER_PAGE, SET_CURRENT_EVENTS_PAGE } from "./actions";

const initialState = {
  eventsPerPage: 5,
  currentEventsPage: 1,
};

export const combinedReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS_PER_PAGE:
      return {
        ...state,
        eventsPerPage: action.payload,
      };
    case SET_CURRENT_EVENTS_PAGE:
      return {
        ...state,
        currentEventsPage: action.payload,
      };
    default:
      return state;
  }
};
