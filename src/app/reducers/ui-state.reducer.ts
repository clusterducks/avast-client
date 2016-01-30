import * as UiStateActions from '../actions/ui-state.actions';

export const initialUiState = {
  actionOngoing: false,
  message: 'Ready'
};

export default (state = [], action: any = {}) => {
  switch (action.type) {
    case UiStateActions.BACKEND_ACTION_STARTED:
      return Object.assign({}, state, {
        actionOngoing: true,
        message: action.message
      });

    case UiStateActions.BACKEND_ACTION_FINISHED:
    default:
      return Object.assign({}, state, {
        actionOngoing: false,
        message: action.message ? action.message : initialUiState.message
      });
  }
};
