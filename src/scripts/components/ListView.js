import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { Link } from 'react-router';

import getClassName from '../utils/getClassName';

require('./ListView.less');

const bem = getClassName('ListView');

export default class ListView {
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
        <Link to={`/view/${game.get('id')}`}>{game.get('title')}</Link>
      </div>
    );
  }
}
