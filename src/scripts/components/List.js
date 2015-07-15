import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import { connect } from 'redux/react';
import { Link } from 'react-router';

import getClassName from '../utils/getClassName';

import ListView from '../components/ListView';

require('./List.less');

const bem = getClassName('List');

@connect(state => ({
  games: state.games
}))
export default class List {
  shouldComponentUpdate: shouldPureComponentUpdate

  render() {
    const listViews = this.props.games.map(this.renderListView);

    return (
      <div className={bem()}>
        {listViews}
        <Link to='/create'>Add game</Link>
      </div>
    );
  }

  renderListView(game) {
    return (
      <ListView game={game} key={game.get('id')} />
    );
  }
}
