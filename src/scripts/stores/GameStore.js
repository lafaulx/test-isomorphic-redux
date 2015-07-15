import { List as list, fromJS } from 'immutable';

import ActionTypes from '../constants/ActionTypes';

const initialState = list();

const actionsMap = {
  [ActionTypes.REQUEST_LIST_OK]: (state, action) => {
    const { body } = action.result;

    return fromJS(body);
  },

  [ActionTypes.REQUEST_GAME_OK]: (state, action) => {
    const body = fromJS(action.result.body);

    const index = state.findIndex(game => {
      return game.get('id') === body.get('id');
    });

    if (index === -1) {
      return state.push(body);
    } else {
      return state.update(index, () => body);
    }
  }
};

export default function GameStore(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  let immutableState = list.isList(state) ? state : fromJS(state);

  if (!reduceFn) {
    return immutableState;
  }

  return reduceFn(immutableState, action);
}
