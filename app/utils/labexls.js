import XLSX from 'xlsx';
import { remote } from 'electron';

const fs = remote.require('fs');

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

  getHeaderLetterByName = (sheet, name) => {
    // headers are in line 2
    const { c: columnsCount } = this.getSheetEnds(sheet);
    for (x=1; x<columnsCount; x++) {
    }

  }

  getSheetEnds = (sheet) => {
    var range = XLSX.utils.decode_range(sheet['!ref']);
    return range.e;
  }


}
