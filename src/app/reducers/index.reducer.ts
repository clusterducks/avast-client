import {combineReducers} from 'redux';

import {consulDatacenters, consulNodes} from './consul.reducer';
import docker from './docker.reducer';
import uiState from './ui-state.reducer';

const rootReducer = combineReducers({
  consulDatacenters,
  consulNodes,
  docker,
  uiState
});

export {rootReducer};
