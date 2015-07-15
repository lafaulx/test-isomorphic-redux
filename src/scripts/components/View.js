import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { Link } from 'react-router';

import getClassName from '../utils/getClassName';

require('./View.less');

const bem = getClassName('View');

export default class View {
  shouldPureComponentUpdate: shouldPureComponentUpdate

  static get propTypes() {
    return {
      game: PropTypes.object.isRequired
    };
  }

  render() {
    const { game } = this.props;

    return (
      <div className={bem()}>
        <Link to='/'>Back</Link>
        {game.get('title')}
      </div>
    );
  }
}
