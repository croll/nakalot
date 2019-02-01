// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TransientsActions from '../actions/transients';
import routes from '../constants/routes';

//import NakalaQL from '../utils/nakalaql';
import NakalaREST from '../utils/nakalarest';

import { remote } from 'electron';
const path = remote.require('path');

import XLSX from 'xlsx';

import imgLoading from '../loading.gif';

function datefilename() {
  return new Date().toISOString().replace(':', '-').replace(':', '-').replace('.', '-').replace('T', '_');
}

class UploadingPage extends Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
    apikey: PropTypes.string.isRequired,
    //userhandle: PropTypes.string.isRequired,
    xlsfilepath: PropTypes.string.isRequired,
    labexls: PropTypes.object.isRequired,
    setTransientsBack: PropTypes.func.isRequired,
    setTransientsNext: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state={
      todoCount: 0,
      doneCount: 0,
      log: [],
    }

    this.props.setTransientsBack('');
    this.props.setTransientsNext('');

    this.dirpath = path.dirname(props.xlsfilepath);
    //this.nakalaql = new NakalaQL(props.userhandle);
    this.nakalarest = new NakalaREST(props.email, props.apikey);
    this.simu = {
      count: 0,
    }
    this.uploadTabs(this.simu)
      .then(() => {
        this.setState({
          todoCount: this.simu.count,
          doneCount: 0,
        });
        console.log("file count to upload: ", this.simu.count);

        return this.doTheJob();
      })
      .catch(err => {
        console.log("work failed : ", err);
      });
  }

  doTheJob = async () => {
    const labexls = this.props.labexls;
    const d=datefilename();
    const flogname = this.dirpath+path.sep+'nakalot-log-'+d+'.csv';
    const fresultname = this.dirpath+path.sep+'nakalot-result-'+d+'.xlsx';
    this.setState({
      log: [],
    });
    try {
      const res = await this.uploadTabs(false);
    } catch (e) {
      console.error("doTheJob error : ", e);
    } finally {
      this.saveLog(flogname);
      labexls.save(fresultname);
    }
    this.props.setTransientsBack(routes.FILECHOOSE);
    this.props.setTransientsNext(routes.HOME);
  }

  saveLog = (fname) => {
    const { log } = this.state;
    let csvSheet = XLSX.utils.aoa_to_sheet(log);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, csvSheet, "log");
    XLSX.writeFile(wb, fname);
  }

  renderLogLine = (line) => {
    return line.map((v, idx) => <td key={idx}>{''+v}</td>);
  }
  renderLog = (log) => {
    return (
      <table>
        <thead>
          <tr>
            <th>date</th>
            <th>tab</th>
            <th>line</th>
            <th>result</th>
            <th>handle</th>
          </tr>
        </thead>
        <tbody>
          {log.map((line, idx) => <tr key={idx}>{this.renderLogLine(line)}</tr>)}
        </tbody>
      </table>
    );
  }



  render() {

    const {
      email,
      password,
      apikey,
    } = this.props;

    const {
      todoCount,
      doneCount,
      log,
    } = this.state;

    const working = todoCount > 0 && doneCount < todoCount;

    return (
      <div className="Uploading">
        <h2 className="stage">
          3. { working ? <span>Envoi...</span> : <span>Envoi terminé</span> }
          { working && ( <img className='loading' src={imgLoading}></img> )}
        </h2>
        <div className="progress">
          <progress value={doneCount} max={todoCount}></progress>
        </div>
        <div className="csvlog">
          {this.renderLog(log)}
        </div>
      </div>
    );
  }

  addToLog = (line) => {
    const { log } = this.state;
    this.setState({
      log: [ ...log, line],
    });
  }

  uploadTabLine = async (simu, sheet, sheetname, linenum) => {
    const labexls = this.props.labexls;
    const email = this.props.email;

    const colStatusNum = 0;
    const colHandleNum = 1;

    const logline = [
      new Date().toLocaleString(),
      ''+sheetname,
      ''+(linenum+1),
      '',
      '',
    ];

    let status = labexls.getValue(sheet, colStatusNum, linenum);
    //console.log("status: ", status);

    if (status === "UPLOAD" || status === "UPLOAD METADATA" || status === "UPLOAD METADATAS") {
      const uploadFile = status === "UPLOAD";
      if (simu) {
        simu.count++;
      } else {
        try {
          let fileHandle = labexls.getValue(sheet, colHandleNum, linenum);
          //let collectionHandleName = labexls.getValueOfColName(sheet, 'Niveau', linenum);
          let collectionHandle = labexls.getValueOfColName(sheet, 'handle collection', linenum);
          let fileName = ''+labexls.getValueOfColName(sheet, 'Nom du document', linenum);
          fileName = fileName.trim();
          let csv=[];
          //csv.push(['nkl:accessEmail', email ]);

          if (collectionHandle) {
            collectionHandle = ''+collectionHandle;
            collectionHandle = collectionHandle.trim().toLowerCase();
            let res = collectionHandle.match(/[0-9a-f]+\/[0-9a-f]+$/);
            if (res && res.length === 1) {
              collectionHandle = res[0];
              csv.push(['nkl:inCollection', collectionHandle ]);
            } else {
              throw new Error("handle collection is invalid");
            }
          } else {
            throw new Error("handle collection must be set !");
          }

          /*
          if (typeof(collectionHandleName) === 'string') {
            collectionHandleName = collectionHandleName.trim();
            let collectionHandle = await this.nakalaql.getCollectionHandle(collectionHandleName);
            if (collectionHandle) {
              let res = collectionHandle.match(/[0-9a-f]+\/[0-9a-f]+$/);
              if (res && res.length === 1) {
                collectionHandle = res[0];
                csv.push(['nkl:inCollection', collectionHandle ]);
              }
            } else {

            }
          }
          */

          csv = labexls.convertRowToCSV(sheet, linenum, csv);
          const res = await this.nakalarest.upload(uploadFile ? this.dirpath+path.sep+fileName : null, fileHandle, fileName, csv);


          logline[3] = res ? (res.success ? 'OK' : res.message) : 'unknown';

          sheet[XLSX.utils.encode_cell({c: colStatusNum, r: linenum})] = {
            t: 's' /* type: string */,
            v: ''+(res ? (res.success ? 'OK' : res.message) : 'unknown') /* value */,
          };

          if (res && res.success === true && res.handleId) {
            logline[4] = ''+(res.handleId);
            sheet[XLSX.utils.encode_cell({c: colHandleNum, r: linenum})] = {
              t: 's' /* type: string */,
              v: ''+(res.handleId) /* value */,
            };
          }

        } catch (err) {
          console.error(err);
          logline[3] = err && err.message ? err.message : ''+err;
        } finally {
          this.addToLog(logline);
          this.setState({
            doneCount: this.state.doneCount + 1,
          });
        }
      }

    }
  }

  uploadTab = async (simu, sheet, sheetname) => {
    const labexls = this.props.labexls;
    const { r: rowsCount } = labexls.getSheetEnds(sheet);
    console.log("rows : ", rowsCount);
    for (let linenum=2; linenum<=rowsCount; linenum++) {
      //console.log("linenum: ", linenum, "/", rowsCount);
      await this.uploadTabLine(simu, sheet, sheetname, linenum);
      //console.log("BREAK AT LINE 1 FOR DEBUG"); break;
    }
  }

  uploadTabs = async (simu) => {
    const labexls = this.props.labexls;

    for (const i_sheet in labexls.wb.Sheets) {
      const sheet = labexls.wb.Sheets[i_sheet];
      await this.uploadTab(simu, sheet, i_sheet);
      //console.log("BREAK AT TAB 1 FOR DEBUG"); break;
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
  return bindActionCreators({...TransientsActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadingPage);

