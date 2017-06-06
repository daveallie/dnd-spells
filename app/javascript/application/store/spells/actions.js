import {
  SET_STAR,
  SET_ALL_FROM_API,
} from './constants';

export const setStar = (id, starred) => ({ type: SET_STAR, payload: { id, starred } });
export const setAllFromAPI = data => ({ type: SET_ALL_FROM_API, payload: data });
