// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LabeXLS from '../utils/labexls';

const { dialog } = require('electron').remote;


import * as ParametersActions from '../actions/parameters';
import * as InstancesActions from '../actions/instances';

class FileChoosePage extends Component {
  static propTypes = {
    filepath: PropTypes.string,
    setInstancesLabexls: PropTypes.func.isRequired,
  };

  static defaultProps = {
    filepath: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
    console.log("constructed ...");
  }

  openFileChoose = () => {
    dialog.showOpenDialog({
      properties: [
        "openFile",
      ],
      filters: [
        { name: 'tableurs', extensions: ['xls', 'xlsx', 'xlsm', 'xlsb', 'ods', 'fods', 'csv'] },
        { name: 'All Files', extensions: ['*'] },
      ]
    }, (filePaths) => {
      if (filePaths && filePaths.length > 0) {
        this.setState({
          filepath: filePaths[0],
        });
        this.updateFromXLS(filePaths[0]);
      }
    });
  }

  updateFromXLS = (filepath) => {
    const labexls = new LabeXLS(filepath);
    this.props.setInstancesLabexls(labexls);
    const infos = labexls.getInfos();
    console.log("infos: ", infos);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("nextPropos: ", nextProps);
    return true;
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
        <div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  email: state.parameters.email,
  password: state.parameters.password,
  apikey: state.parameters.apikey,
  labexls: state.instances.labexls,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...ParametersActions, ...InstancesActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FileChoosePage);
