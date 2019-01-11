import XLSX from 'xlsx';
import { remote } from 'electron';
import { isSetAccessor } from 'typescript';

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
}
