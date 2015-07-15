import {
  REQUEST_LIST,
  REQUEST_LIST_OK,
  REQUEST_LIST_FAIL,
  REQUEST_GAME,
  REQUEST_GAME_OK,
  REQUEST_GAME_FAIL,
  CREATE_GAME,
  CREATE_GAME_OK,
  CREATE_GAME_FAIL
} from '../constants/ActionTypes';

import { get, post } from '../utils/APIUtils';

export function requestList() {
  return (dispatch) => {
    let url = `/api/games`;

    return dispatch({
      types: [REQUEST_LIST, REQUEST_LIST_OK, REQUEST_LIST_FAIL],
      promise: new Promise((resolve, reject) => {
        return get(url).end(res => {
          if (res.ok) {
            resolve(res);
          } else {
            reject(res);
          }
        });
      })
    });
  };
}

export function requestGame(id) {
  return (dispatch) => {
    let url = '/api/games?id=' + id;

    return dispatch({
      types: [REQUEST_GAME, REQUEST_GAME_OK, REQUEST_GAME_FAIL],
      promise: new Promise((resolve, reject) => {
        return get(url).end(res => {
          if (res.ok) {
            resolve(res);
          } else {
            reject(res);
          }
        });
      })
    });
  };
}

export function createGame(game, callback) {
  return (dispatch) => {
    let url = '/api/game';

    return dispatch({
      types: [CREATE_GAME, CREATE_GAME_OK, CREATE_GAME_FAIL],
      promise: new Promise((resolve, reject) => {
        return post(url).send(game).end(res => {
          if (res.ok) {
            resolve(res);

            console.log(game);
            if (callback) {
              callback();
            }
          } else {
            reject(res);
          }
        });
      })
    });
  };
}
