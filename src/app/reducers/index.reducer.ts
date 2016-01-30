import {combineReducers} from 'redux';

import consul from './consul.reducer';
import docker from './docker.reducer';
import uiState from './ui-state.reducer';

const rootReducer = combineReducers({
  consul,
  docker,
  uiState
});

export {rootReducer};
