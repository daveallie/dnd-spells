import { combineReducers } from 'redux-immutable';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { OrderedMap, Record, fromJS } from 'immutable';

import setupStore from '../helpers/setupStore';
import loading from './loading/reducers';
import spells from './spells/reducers';

const data = window.__INITIAL_STATE__ || {};

const spellsInitialState = OrderedMap((data.spells || []).map(s => ([s.id, fromJS(s)])));

const StateRecord = Record({ spells: undefined, loading: false, router: undefined });
const initialState = new StateRecord({
  spells: spellsInitialState,
});

const reducer = combineReducers({
  spells,
  loading,
  router: routerReducer,
}, initialState);

export const history = createHistory();

export default setupStore(reducer, initialState, routerMiddleware(history));
