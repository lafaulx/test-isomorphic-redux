import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import getClassName from '../utils/getClassName';

require('./View.less');

const bem = getClassName('View');

export default class View {
  shouldComponentUpdate: shouldPureComponentUpdate

  static get propTypes() {
    return {
      game: PropTypes.object.isRequired
    };
  }

  render() {
    const { game } = this.props;

    return (
      <div className={bem()}>
        {game.get('title')}
      </div>
    );
  }
}
