import React, { PropTypes } from 'react';
import { connect } from 'redux/react';

import * as GameActions from '../actions/GameActions';
import statics from '../utils/statics';
import View from '../components/View';

@statics({
  fetchData(state, redux) {
    const { dispatch } = redux;

    return dispatch(GameActions.requestGame(parseInt(state.params.id, 10)));
  }
})
@connect(state => ({
  games: state.games
}))
export default class ViewHandler {
  static get contextTypes() {
    return {
      redux: PropTypes.object.isRequired,
      params: PropTypes.object.isRequired
    };
  }

  render() {
    const id = parseInt(this.context.params.id, 10);
    const game = this.props.games.find(g => {
      return id === g.get('id');
    });

    return (
      <View game={game}/>
    );
  }
}
