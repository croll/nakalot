// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as CounterActions from '../actions/counter';

import NakalaQL from '../utils/nakalaql';

class UploadingPage extends Component {
  static propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    apikey: PropTypes.string,
    filepath: PropTypes.string,
    labexls: PropTypes.object.isRequired,
  };

  static defaultProps = {
    email: '',
    password: '',
    apikey: '',
    filepath: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      ...props,
    }
    this.nakalaql = new NakalaQL('11280/47c113f5');
    this.uploadTabs();
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

    const colStatusNum = 0;
    const colHandleNum = 1;
    const colCollectionNum = labexls.getHeaderColumnByName(sheet, 'Niveau');
    
    let collectionHandleName = labexls.getValue(sheet, colCollectionNum, linenum);
    if (typeof(collectionHandleName) === 'string') {
      collectionHandleName = collectionHandleName.trim();
      const handle = await this.nakalaql.getCollectionHandle(collectionHandleName);
      console.log("got handle : ", colCollectionNum, collectionHandleName, "=>", handle);

      // build csv
      const csv = labexls.convertRowToCSV(sheet, linenum);

      console.log("csv: ", csv);
    } else {
    }
  }

  uploadTab = async (sheet) => {
    const labexls = this.props.labexls;
    const { r: rowsCount } = labexls.getSheetEnds(sheet);
    console.log("rows : ", rowsCount);
    for (let linenum=2; linenum<rowsCount; linenum++) {
      await this.uploadTabLine(sheet, linenum);
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
  apikey: state.parameters.handle,
  labexls: state.instances.labexls,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadingPage);

