// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';
import parameters from './parameters';
import instances from './instances';
import transients from './transients';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    counter,
    parameters,
    instances,
    transients,
  });
}
