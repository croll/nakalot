// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ParametersActions from '../actions/parameters';
import * as InstancesActions from '../actions/instances';
import * as TransientsActions from '../actions/transients';

import routes from '../constants/routes';

class ParametersPage extends Component {
  static propTypes = {
    email: PropTypes.string,
    apikey: PropTypes.string,
    //userhandle: PropTypes.string,

    setParametersEmail: PropTypes.func,
    setParametersApiKey: PropTypes.func,
    //setParametersUserHandle: PropTypes.func,
    setTransientsBack: PropTypes.func.isRequired,
    setTransientsNext: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.props.setTransientsBack(routes.HOME);
    ParametersPage.checkForm(props);
    //this.props.setTransientsNext(routes.FILECHOOSE);
  }

  static checkForm(props) {
    const {
      email, apikey, /*userhandle,*/ setTransientsNext
    } = props;

    if (
      (typeof(email) === 'string' && email.length > 0)
      && (typeof(apikey) === 'string' && apikey.length > 0)
      /*&& (typeof(userhandle) === 'string' && userhandle.length > 0)*/) {
      setTransientsNext(routes.FILECHOOSE);
    } else {
      setTransientsNext('');
    }
  }

  static getDerivedStateFromProps(props, state) {
    ParametersPage.checkForm(props);
    return null;
  }

  render() {
    const {
      email,
      apikey,
      //userhandle,

      setParametersEmail,
      setParametersApiKey,
      //setParametersUserHandle,
    } = this.props;

    return (
      <div className="Parameters">
        <h2 className="stage">
          1. Paramètres d'envoi
        </h2>
        <div className="form">
          <div className="email">
            <label htmlFor="email">Email :</label>
            <input id='email' type="text" value={email} onChange={(e) => { setParametersEmail(e.target.value)}}/>
          </div>
          <div className="apikey">
            <label htmlFor="apikey">Nakala API Key :</label>
            <input id="apikey" name="apikey" type="text" value={apikey} onChange={(e) => { setParametersApiKey(e.target.value )}}/>
          </div>
        </div>
      </div>
    );
    /*
          <div className="userhandle">
            <label htmlFor="userhandle">Nakala User Handle :</label>
            <input id="userhandle" name="userhandle" type="text" value={userhandle} onChange={(e) => { setParametersUserHandle(e.target.value )}}/>
          </div>
    */
  }
}

const mapStateToProps = state => ({
  email: state.parameters.email,
  password: state.parameters.password,
  apikey: state.parameters.apikey,
  //userhandle: state.parameters.userhandle,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...ParametersActions, ...InstancesActions, ...TransientsActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ParametersPage);

