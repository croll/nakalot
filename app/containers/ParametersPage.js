import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Parameters from '../components/Parameters';
import * as CounterActions from '../actions/counter';

function mapStateToProps(state) {
  return {
    email: state.email,
    password: state.password,
    handle: state.handle,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Parameters);
