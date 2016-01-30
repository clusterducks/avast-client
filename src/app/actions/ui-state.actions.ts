import {Injectable} from 'angular2/core';

export const BACKEND_ACTION_STARTED = 'BACKEND_ACTION_STARTED';
export const BACKEND_ACTION_FINISHED = 'BACKEND_ACTION_FINISHED';

@Injectable()
export class UiStateActions {

  startBackendAction(message: string) {
    return {
      type: BACKEND_ACTION_STARTED,
      message
    };
  }

  endBackendAction(message: string = '') {
    return {
      type: BACKEND_ACTION_FINISHED
    };
  }

}
