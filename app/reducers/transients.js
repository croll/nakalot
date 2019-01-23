// @flow
import { SET_TRANSIENTS_XLSFILEPATH, SET_TRANSIENTS_BACK, SET_TRANSIENTS_NEXT } from '../actions/transients';
import type { Action } from './types';

export default function transients(state = {xlsfilepath: '', back: '', next: ''}, action: Action) {
  switch (action.type) {
    case SET_TRANSIENTS_XLSFILEPATH:
      return {
        ...state,
        xlsfilepath: action.value,
      };
    case SET_TRANSIENTS_BACK:
      return {
        ...state,
        back: action.value,
      };
    case SET_TRANSIENTS_NEXT:
      return {
        ...state,
        next: action.value,
      };
    default:
      return state;
  }
}
