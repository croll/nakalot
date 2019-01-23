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
import * as TransientsActions from '../actions/transients';
import routes from '../constants/routes';

class FileChoosePage extends Component {
  static propTypes = {
    xlsfilepath: PropTypes.string,
    setInstancesLabexls: PropTypes.func.isRequired,
    setTransientsXLSFilepath: PropTypes.func.isRequired,
    setTransientsBack: PropTypes.func.isRequired,
    setTransientsNext: PropTypes.func.isRequired,
  };

  static defaultProps = {
    xlsfilepath: '',
  };

  constructor(props) {
    super(props);
    this.props.setTransientsBack(routes.PARAMETERS);
    this.props.setTransientsNext(routes.UPLOADING);
  }

  openFileChoose = () => {
    const {
      setTransientsXLSFilepath,
    } = this.props;

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
        setTransientsXLSFilepath(filePaths[0]);
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
      xlsfilepath,
      setTransientsXLSFilepath,
    } = this.props;
    return (
      <div className="FileChoose">
        <h2 className="stage">
          2. Fichier de description (tableur)
        </h2>
        <div className="form">
          <div className="filepath">
            <label htmlFor="filepath">Fichier :</label>
            <input id='filepath' type="text" value={xlsfilepath} onChange={(e) => { setTransientsXLSFilepath(e.target.value )}}/>
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
  xlsfilepath: state.transients.xlsfilepath,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...ParametersActions, ...InstancesActions, ...TransientsActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FileChoosePage);
