import React, { PropTypes } from 'react';

import * as GameActions from '../actions/GameActions';

import List from '../components/List';

export default class ListHandler {
  static fetchData(state, redux) {
    const { dispatch } = redux;

    return dispatch(GameActions.requestList());
  }

  static get contextTypes() {
    return {
      redux: PropTypes.object.isRequired
    };
  }

  render() {
    return (
      <List />
    );
  }
}
