import React, { Component } from 'react';
import Home from '../components/Home';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TransientsActions from '../actions/transients';

type Props = {};

class HomePage extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...TransientsActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

