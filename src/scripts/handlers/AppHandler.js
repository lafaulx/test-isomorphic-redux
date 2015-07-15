import React, { PropTypes } from 'react';
import { RouteHandler } from 'react-router';

import * as GameActions from '../actions/GameActions';

export default class AppHandler {
  static get propTypes() {
    return {
      pathname: PropTypes.string.isRequired,
      params: PropTypes.object.isRequired,
      query: PropTypes.object.isRequired
    };
  }

  static get childContextTypes() {
    return {
      redux: React.PropTypes.object.isRequired
    };
  }

  getChildContext() {
    return {
      redux: this.props.redux
    };
  }

  render() {
    const { pathname } = this.props;

    return (
      <RouteHandler key={pathname} />
    );
  }
}
