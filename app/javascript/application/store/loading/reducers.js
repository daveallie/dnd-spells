import {
  SET_LOADING_STATE,
} from './constants';

const initialState = false;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING_STATE:
      return payload;
    default:
      return state;
  }
};
