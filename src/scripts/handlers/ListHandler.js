import React, { PropTypes } from 'react';
import { connect } from 'redux/react';

import * as GameActions from '../actions/GameActions';
import statics from '../utils/statics';

import List from '../components/List';

@statics({
  fetchData(state, redux) {
    const { dispatch } = redux;

    return dispatch(GameActions.requestList());
  }
})
@connect(state => ({
  games: state.games
}))
export default class ListHandler {
  static get contextTypes() {
    return {
      redux: PropTypes.object.isRequired
    };
  }

  render() {
    return (
      <List games={this.props.games}/>
    );
  }
}
