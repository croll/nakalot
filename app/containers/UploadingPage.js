// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as CounterActions from '../actions/counter';

class UploadingPage extends Component {
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
      <div className="Uploading">
        <h2 className="stage">
          3. Envoi...
        </h2>
        <div className="form">
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadingPage);

