// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ParametersActions from '../actions/parameters';
import * as InstancesActions from '../actions/instances';

class ParametersPage extends Component {
  static propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    apikey: PropTypes.string,

    setParametersEmail: PropTypes.func,
    setParametersPassword: PropTypes.func,
    setParametersApiKey: PropTypes.func,
  };

  static defaultProps = {
    email: '',
    password: '',
    apikey: '',
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
      apikey,
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
          <div className="apikey">
            <label htmlFor="apikey">Nakala API Key :</label>
            <input id="apikey" name="apikey" type="text" value={apikey} onChange={(e) => { this.setState({ apikey: e.target.value })}}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  email: state.email,
  password: state.password,
  apikey: state.apikey,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...ParametersActions, ...InstancesActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ParametersPage);

