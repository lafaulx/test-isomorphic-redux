import React, { PropTypes } from 'react';
import { RouteHandler } from 'react-router';

export default class AppHandler {
  static get propTypes() {
    return {
      pathname: PropTypes.string.isRequired,
      params: PropTypes.object.isRequired,
      query: PropTypes.object.isRequired
    };
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  static get childContextTypes() {
    return {
      redux: React.PropTypes.object.isRequired,
      router: React.PropTypes.func.isRequired,
      params: React.PropTypes.object
    };
  }

  getChildContext() {
    return {
      redux: this.props.redux,
      router: this.context.router,
      params: this.props.params
    };
  }

  render() {
    const { pathname } = this.props;

    return (
      <RouteHandler key={pathname} />
    );
  }
}
