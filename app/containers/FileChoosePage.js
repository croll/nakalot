// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { dialog } = require('electron').remote;


import * as CounterActions from '../actions/counter';

class FileChoosePage extends Component {
  static propTypes = {
    filepath: PropTypes.string,
  };

  static defaultProps = {
    filepath: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      ...props,
    }
  }

  openFileChoose = () => {
    dialog.showOpenDialog({
      properties: [
        "openFile",
      ],
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
        { name: 'All Files', extensions: ['*'] },
      ]
    }, (filePaths) => {
      if (filePaths && filePaths.length > 0) {
        this.setState({
          filepath: filePaths[0],
        })
      }
    });
  }

  render() {
    const {
      filepath,
    } = this.state;
    return (
      <div className="FileChoose">
        <h2 className="stage">
          2. Fichier de description (tableur)
        </h2>
        <div className="form">
          <div className="filepath">
            <label htmlFor="filepath">Fichier :</label>
            <input id='filepath' type="text" value={filepath} onChange={(e) => { this.setState({ filepath: e.target.value })}}/>
            <button onClick={() => { this.openFileChoose(); }}>Choisir...</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(FileChoosePage);
