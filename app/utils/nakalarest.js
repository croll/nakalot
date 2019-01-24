import { remote } from 'electron';
//const plop = remote.require('./nakalarestOnRemote');
const plop = require('./nakalarestOnRemote');

export default class NakalaREST {
  constructor(email, apikey) {
    this.params = { email, apikey };
  }

  upload = (filepath, handle, filename, csv) => {
    return plop.upload(filepath, handle, filename, csv, this.params);
  }
}
