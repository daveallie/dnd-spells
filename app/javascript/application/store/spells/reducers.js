import { OrderedMap, fromJS } from 'immutable';

import {
  SET_STAR,
  SET_ALL_FROM_API,
} from './constants';

const initialState = OrderedMap([]);

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ALL_FROM_API:
      return state.concat(payload.map(s => ([s.id, fromJS(s)])));
    case SET_STAR:
      const {id, starred} = payload
      return state.setIn([id, 'starred'], () => starred);
    default:
      return state;
  }
}
