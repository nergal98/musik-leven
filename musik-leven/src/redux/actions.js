export const SET_EVENTS_PER_PAGE = 'SET_EVENTS_PER_PAGE';

export const setEventsPerPage = (num) => {
  return {
    type: SET_EVENTS_PER_PAGE,
    payload: num
  }
}