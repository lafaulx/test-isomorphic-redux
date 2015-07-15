import React, { PropTypes } from 'react';
import { connect } from 'redux/react';
import { bindActionCreators } from 'redux';

import Edit from '../components/Edit';
import statics from '../utils/statics';
import * as GameActions from '../actions/GameActions';

@statics({
  fetchData(state, redux) {
    const { dispatch } = redux;

    return dispatch(GameActions.requestGame(parseInt(state.params.id, 10)));
  }
})
@connect(state => ({
  games: state.games
}))
export default class EditHandler {
  static get contextTypes() {
    return {
      redux: PropTypes.object.isRequired,
      router: React.PropTypes.func.isRequired,
      params: PropTypes.object.isRequired
    };
  }

  render() {
    const id = parseInt(this.context.params.id, 10);
    const game = this.props.games.find(g => {
      return id === g.get('id');
    });
    const bindedGameActions = bindActionCreators(GameActions, this.context.redux.dispatch);

    return (
      <Edit game={game} updateGame={bindedGameActions.updateGame}/>
    );
  }
}
