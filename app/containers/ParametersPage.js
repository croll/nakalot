// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as CounterActions from '../actions/counter';

class ParametersPage extends Component {
  static propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    handle: PropTypes.string,
  };

  static defaultProps = {
    email: '',
    password: '',
    handle: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      ...props,
    }
  }

  render() {
    const {
      email,
      password,
      handle,
    } = this.state;
    return (
      <div className="Parameters">
        <h2 className="stage">
          1. Parametres d'envoi
        </h2>
        <div className="form">
          <div className="email">
            <label htmlFor="email">Email :</label>
            <input id='email' type="text" value={email} onChange={(e) => { this.setState({ email: e.target.value })}}/>
          </div>
          <div className="password">
            <label htmlFor="password">Mot de passe :</label>
            <input id="password" name="password" type="password" value={password} onChange={(e) => { this.setState({ password: e.target.value })}}/>
          </div>
          <div className="handle">
            <label htmlFor="handle">Handle :</label>
            <input id="handle" name="handle" type="text" value={handle} onChange={(e) => { this.setState({ handle: e.target.value })}}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  email: state.email,
  password: state.password,
  handle: state.handle,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ParametersPage);
