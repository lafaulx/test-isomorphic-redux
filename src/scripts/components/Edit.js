import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { Link } from 'react-router';

import getClassName from '../utils/getClassName';
import Platforms from '../constants/Platforms';

require('./Edit.less');

const bem = getClassName('Edit');

export default class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      platform: '',
      description: ''
    };
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  shouldPureComponentUpdate: shouldPureComponentUpdate

  static get contextTypes() {
    return {
      router: React.PropTypes.func.isRequired
    };
  }

  static get propTypes() {
    return {
      game: PropTypes.object
    };
  }

  componentDidMount() {
    const game = this.props.game && this.props.game.toJS();

    if (game) {
      this.setState(game);
    }
  }

  render() {
    let { title, platform, description } = this.state;
    let options = [];

    for (let i in Platforms) {
      options.push(this.renderOption(Platforms[i]));
    }

    return (
      <div className={bem()}>
        <Link to='/'>Back</Link>
        <input type='text' name='title' value={title} placeholder='Title' onChange={this.handleChange} />
        <div>
          <label for='platform'>Platform</label>
          <select value={platform} onChange={this.handleChange}>
            {options}
          </select>
        </div>
        <input type='text' name='description' value={description} placeholder='Description' onChange={this.handleChange} />

        <button onClick={this.handleSaveClick}>Save</button>
      </div>
    );
  }

  renderOption(option) {
    return (
      <option value={option} key={option}>{option}</option>
    );
  }

  handleSaveClick() {
    let self = this;

    if (this.props.game) {
      this.props.updateGame(this.state, () => {
        self.context.router.transitionTo('list');
      });
    } else {
      this.props.createGame(this.state, () => {
        self.context.router.transitionTo('list');
      });
    }
  }

  handleChange(e) {
    const { value, name } = e.currentTarget;

    let state = this.state;
    state[name] = value;

    this.setState(state);
  }
}
