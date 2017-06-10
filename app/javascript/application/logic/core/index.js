import { createReducer, createActions } from 'redux-em';
import * as LoadingCore from './loading';
import * as SpellsCore from './spells';

export const loadingReducer = createReducer(LoadingCore);
export const loadingActions = createActions(LoadingCore);
export const spellsReducer = createReducer(SpellsCore);
export const spellsActions = createActions(SpellsCore);
