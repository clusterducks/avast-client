///<reference path="../../../node_modules/immutable/dist/immutable.d.ts"/>
import {List} from 'immutable';

import * as DockerActions from '../actions/docker.actions';

export const initialDockerState = {
  containers: List([]),
  images: List([]),
};

// @TODO: type DockerState with containers[List], images[List], etc.
export default (state = [], action: any = {}) => {
  switch (action.type) {
    case DockerActions.REQUEST_CONTAINERS:
      return Object.assign({}, state, {
        isFetchingContainers: true
      });

    case DockerActions.RECEIVE_CONTAINERS:
      return Object.assign({}, state, {
        containers: action.containers,
        isFetchingContainers: false
      });

    case DockerActions.REQUEST_IMAGES:
      return Object.assign({}, state, {
        isFetchingImages: true
      });

    case DockerActions.RECEIVE_IMAGES:
      return Object.assign({}, state, {
        rootImage: action.rootImage,
        isFetchingImages: false
      });

    default:
      return state;
  }
};
