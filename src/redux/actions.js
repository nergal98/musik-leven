export const SET_EVENTS_PER_PAGE = "SET_EVENTS_PER_PAGE";

export const setEventsPerPage = (num) => {
  return {
    type: SET_EVENTS_PER_PAGE,
    payload: num,
  };
};

export const SET_CURRENT_EVENTS_PAGE = "SET_CURRENT_PAGE";

export const setCurrentEventsPage = (num) => {
  return {
    type: SET_CURRENT_EVENTS_PAGE,
    payload: num,
  };
};
