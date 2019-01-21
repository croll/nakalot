import { remote } from 'electron';
const plop = remote.require('./nakalarestOnRemote');

export default class NakalaREST {
  upload = (filepath, csv) => {
    plop.upload();
  }
}
