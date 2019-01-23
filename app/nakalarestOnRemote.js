const https = require('https');
const archiver = require('archiver');
const querystring = require('querystring');


module.exports.upload = (filepath, handle, filename, csv, params) => {
  return new Promise((resolve, reject) => {
    try {

      console.log("uploading : ", filepath, csv);

      const gets = {
        email: params.email,
        key: params.apikey,
      }

      const path = '/nakala/api/v1/data' + (handle ? '/'+handle : '') + '?' + querystring.stringify(gets);
      console.log("path: ", path);

      const req = https.request({
        host: 'www.nakala.fr',
        path: path,
        port: 443,
        method: handle ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      }, (res) => {
        res.on('data', (data) => {
          console.log("res data string: ", data.toString());
          console.log("res data string toJson: ", JSON.parse(data.toString()));
          resolve(JSON.parse(data.toString()));
        });
      });


      req.on('close', () => {
        console.log("req closed");
      });

      req.on('end', () => {
        console.log("req end");
      });

      req.on('error', (err) => {
        console.log("error: ", err);
        throw err;
      });

      req.on('data', (data) => { // should not happen
        console.log("req data: ", data);
      });

      const archive = archiver('zip', {
        zlib: { level: 3 } // Sets the compression level.
      });

      archive.on('warning', err => {
        if (err.code === 'ENOENT') {
          console.warn("archive warning: ", err);
          reject(err);
          // log warning
        } else {
          console.error("archive warning error: ", err);
          // throw error
          throw err;
        }
      });

      // good practice to catch this error explicitly
      archive.on('error', err => {
        console.error("archive error: ", err);
        throw err;
      });

      archive.on('progress', (progress) => {
        console.log("progress:  ", progress);
      });

      archive.pipe(req);


      console.log("adding : ", filepath);
      archive.file(filepath, { name: filename });
      archive.append(csv, { name: 'nakala.csv' });

      //archive.file('/home/nicolas/croll/clients/labexmed/nakalot/nakala/nakala-console/input/Nakala-Documentation-API.csv', { name: 'Nakala-Documentation-API.csv'});
      //archive.file('/home/nicolas/croll/clients/labexmed/nakalot/nakala/nakala-console/input/Nakala-Documentation-API.docx', { name: 'Nakala-Documentation-API.docx'});


      archive.finalize();

    } catch (e) {
      console.log("EXCEPTION : ", e);
      reject(e);
    }

  });

};

