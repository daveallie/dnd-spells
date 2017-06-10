import { OrderedMap, fromJS } from 'immutable';

export const spellsInit = () => OrderedMap();
export const spellsInitFromAPI = (state, data) => OrderedMap(data.map(s => ([s.id, fromJS(s)])));
export const spellsSetStar = (state, { id, starred }) => state.setIn([id, 'starred'], starred);
