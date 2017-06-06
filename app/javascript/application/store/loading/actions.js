import {
  SET_LOADING_STATE,
} from './constants';

export const setLoading = () => ({ type: SET_LOADING_STATE, payload: true });
export const unsetLoading = () => ({ type: SET_LOADING_STATE, payload: false });
