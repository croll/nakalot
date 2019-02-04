import XLSX from 'xlsx';
//import { remote } from 'electron';

//const fs = remote.require('fs');
const fs = require('fs');

export default class LabeXLS {
  constructor(filepath) {
    const contents = fs.readFileSync(filepath);
    this.wb = XLSX.read(contents, {type:'buffer'});
    console.log("workbook.Sheets", this.wb.Sheets);
  }

  getInfos = () => {
    const infos = [];
    Object.keys(this.wb.Sheets).forEach(title => {
      const sheet = this.wb.Sheets[title];
      infos.push({
        title,
        count: sheet,
      });
    });
    return infos;
  }

  getHeaderColumnByName = (sheet, name) => {
    const { c: columnsCount } = this.getSheetEnds(sheet);
    for (let c=0; c<columnsCount; c++) {
      const cellAdress = XLSX.utils.encode_cell({c, r: 1});
      if (typeof(sheet[cellAdress]) === 'object') {
        let str = ''+sheet[cellAdress].v;
        str=str.trim();
        if (name.localeCompare(str) === 0) {
          return c;
        }
      }
    }
    return undefined;
  }

  getValue = (sheet, c, r) => {
    const obj = sheet[XLSX.utils.encode_cell({r, c})];
    if (obj !== undefined) {
      if (obj.v !== undefined) {
        return obj.v;
      }
    }
    return undefined;
  }

  getValueOfColName = (sheet, colname, r) => {
    const c = this.getHeaderColumnByName(sheet, colname);
    if (c === undefined) return undefined;
    return this.getValue(sheet, c, r);
  }

  getSheetEnds = (sheet) => {
    console.log("!ref: ", sheet['!ref']);
    var range = XLSX.utils.decode_range(sheet['!ref']);
    return range.e;
  }

  getHeaderByNum = (sheet, c) => {
    const obj = sheet[XLSX.utils.encode_cell({c, r: 1})];
    if (obj) return obj.v;
    else return undefined;
  }

  convertRowToCSV = (sheet, rowNum, moreParams = []) => {
    let csvArray=[];
    moreParams.forEach(param => {
      csvArray.push([...param]);
    });
    const { c: columnsCount } = this.getSheetEnds(sheet);
    for (let c=5; c<=columnsCount; c++) {
      const header = this.getHeaderByNum(sheet, c);
      const valueObj = sheet[XLSX.utils.encode_cell({c, r: rowNum})];
      if (header && valueObj) {
        let str_h = ''+header;
        let str_v = ''+valueObj.v;
        str_h = str_h.trim().toLowerCase();
        str_v = str_v.trim();
        csvArray.push([ str_h, str_v]);
      }
    }

    const csvSheet = XLSX.utils.aoa_to_sheet(csvArray);
    return XLSX.utils.sheet_to_csv(csvSheet);
  }

  save = (fname) => {
    XLSX.writeFile(this.wb, fname);
  }


}
