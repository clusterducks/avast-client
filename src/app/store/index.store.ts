import {Injectable} from 'angular2/core';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {ReduxStore} from 'angular2-redux-store/lib';
const thunk = require('redux-thunk');
const createLogger = require('redux-logger');

import {rootReducer} from '../reducers/index.reducer';
import {initialConsulState} from '../reducers/consul.reducer';
import {initialDockerState} from '../reducers/docker.reducer';
import {initialUiState} from '../reducers/ui-state.reducer';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  logger
)(createStore);

const store = createStoreWithMiddleware(
  rootReducer, {
    consul: initialConsulState,
    docker: initialDockerState,
    uiState: initialUiState
  }
);

@Injectable()
export class AppStore extends ReduxStore {
  constructor() {
    super(store);
  }
}
