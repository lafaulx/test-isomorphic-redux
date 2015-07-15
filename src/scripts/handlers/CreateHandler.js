import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';

import Edit from '../components/Edit';
import * as GameActions from '../actions/GameActions';

export default class CreateHandler {
  static get contextTypes() {
    return {
      redux: PropTypes.object.isRequired,
      router: React.PropTypes.func.isRequired
    };
  }

  render() {
    const bindedGameActions = bindActionCreators(GameActions, this.context.redux.dispatch);

    return (
      <Edit createGame={bindedGameActions.createGame}/>
    );
  }
}
