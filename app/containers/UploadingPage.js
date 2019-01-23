// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as CounterActions from '../actions/counter';

import NakalaQL from '../utils/nakalaql';
import NakalaREST from '../utils/nakalarest';

import { remote } from 'electron';
const path = remote.require('path');


class UploadingPage extends Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
    apikey: PropTypes.string.isRequired,
    userhandle: PropTypes.string.isRequired,
    xlsfilepath: PropTypes.string.isRequired,
    labexls: PropTypes.object.isRequired,
  };

  /*
  static defaultProps = {
    email: '',
    password: '',
    apikey: '',
    xlsfilepath: '',
  };
  */

  constructor(props) {
    super(props);
    this.state = {
      ...props,
    }
    this.dirpath = path.dirname(props.xlsfilepath);
    this.nakalaql = new NakalaQL(props.userhandle);
    this.nakalarest = new NakalaREST(props.email, props.apikey);
    this.uploadTabs();
    //console.log("NakalaREST : ", NakalaREST);
  }

  render() {


    //nakalaql.getMyCollections();

    const {
      email,
      password,
      apikey,
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

  uploadTabLine = async (sheet, linenum) => {
    const labexls = this.props.labexls;
    const email = this.props.email;

    const colStatusNum = 0;
    const colHandleNum = 1;

    let collectionHandleName = labexls.getValueOfColName(sheet, 'Niveau', linenum);
    let fileName = labexls.getValueOfColName(sheet, 'Nom du document', linenum);
    let csv=[];
    //csv.push(['nkl:accessEmail', email ]);

    if (typeof(collectionHandleName) === 'string') {
      collectionHandleName = collectionHandleName.trim();
      let handle = await this.nakalaql.getCollectionHandle(collectionHandleName);
      if (handle) {
        let res = handle.match(/[0-9a-f]+\/[0-9a-f]+$/);
        if (res && res.length === 1) {
          handle = res[0];
        }
      }

      csv.push(['nkl:inCollection', handle ]);
    }

    csv = labexls.convertRowToCSV(sheet, linenum, csv);

    console.log("upload ...");
    this.nakalarest.upload(this.dirpath+path.sep+fileName, fileName, csv);

  }

  uploadTab = async (sheet) => {
    const labexls = this.props.labexls;
    const { r: rowsCount } = labexls.getSheetEnds(sheet);
    console.log("rows : ", rowsCount);
    for (let linenum=2; linenum<rowsCount; linenum++) {
      await this.uploadTabLine(sheet, linenum);
      console.log("BREAK AT LINE 1 FOR DEBUG"); break;

    }
  }

  uploadTabs = async () => {
    const labexls = this.props.labexls;

    for (const i_sheet in labexls.wb.Sheets) {
      const sheet = labexls.wb.Sheets[i_sheet];
      await this.uploadTab(sheet);
      console.log("BREAK AT TAB 1 FOR DEBUG"); break;
    }
  }

}

const mapStateToProps = state => ({
  email: state.parameters.email,
  password: state.parameters.password,
  apikey: state.parameters.apikey,
  userhandle: state.parameters.userhandle,
  labexls: state.instances.labexls,
  xlsfilepath: state.transients.xlsfilepath,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadingPage);

