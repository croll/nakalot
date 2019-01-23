import { remote } from 'electron';
const plop = remote.require('./nakalarestOnRemote');

export default class NakalaREST {
  constructor(email, apikey) {
    this.params = { email, apikey };
  }

  upload = (filepath, filename, csv) => {
    plop.upload(filepath, filename, csv, this.params);
  }
}
