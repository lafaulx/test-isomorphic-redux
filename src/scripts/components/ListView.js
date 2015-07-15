import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import getClassName from '../utils/getClassName';

require('./ListView.less');

const bem = getClassName('ListView');

export default class ListView {
  shouldComponentUpdate: shouldPureComponentUpdate

  static get getPropTypes() {
    return {
      game: PropTypes.object.isRequired
    };
  }

  render() {
    const { game } = this.props;

    return (
      <div className={bem()}>
        {game.get('name')}
      </div>
    );
  }
}
