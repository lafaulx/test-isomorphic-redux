import {
  REQUEST_LIST,
  REQUEST_LIST_OK,
  REQUEST_LIST_FAIL
} from '../constants/ActionTypes';

import { get } from '../utils/APIUtils';

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
