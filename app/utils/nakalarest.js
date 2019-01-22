import { remote } from 'electron';
const plop = remote.require('./nakalarestOnRemote');

export default class NakalaREST {
  constructor(email, apikey) {
    this.params = { email, apikey };
  }

  upload = (filepath, csv) => {
    plop.upload(filepath, csv, this.params);
  }
}
