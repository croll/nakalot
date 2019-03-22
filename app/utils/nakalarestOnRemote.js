const fs = require('fs');
const https = require('https');
const archiver = require('archiver');
const querystring = require('querystring');


module.exports.upload = (filepath, handle, filename, csv, params, progressCB) => {
  let fstream;
  const p=new Promise((resolve, reject) => {
    try {

      console.log("uploading : ", filepath, csv);

      const gets = {
        email: params.email,
        key: params.apikey,
      }

      const path = '/nakala/api/v1/data' + (handle ? '/'+handle : '') + '?' + querystring.stringify(gets);
      const method = handle ? 'PUT' : 'POST'
      console.log("path: ", path, method);

      const req = https.request({
        host: 'www.nakala.fr',
        path: path,
        port: 443,
        method: method,
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      }, (res) => {
        res.on('data', (data) => {
          console.log("res data string: ", data.toString());
          try {
            console.log("res data string toJson: ", JSON.parse(data.toString()));
            resolve(JSON.parse(data.toString()));
          } catch {
            reject(data.toString());
          }
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
        reject(err);
      });

      req.on('data', (data) => { // should not happen
        console.log("req data: ", data);
      });

      const archive = archiver('zip', {
        zlib: { level: 3 }, // Sets the compression level.
        forceZip64: true,  // 4GB file support
      });

      archive.on('warning', err => {
        if (err.code === 'ENOENT') {
          console.warn("archive warning: ", err);
          reject(err);
          // log warning
        } else {
          console.error("archive warning error: ", err);
          // throw error
          reject(err);
        }
      });

      // good practice to catch this error explicitly
      archive.on('error', err => {
        console.error("archive error: ", err);
        reject(err);
      });

      archive.on('progress', (progress) => {
        console.log("progress:  ", progress);
      });

      archive.pipe(req);


      if (filepath !== null) {
        fstream = fs.createReadStream(filepath);
        fstream.on('error', err => reject(err));
        archive.append(fstream, { name: filename });
        //archive.file(filepath, { name: filename });
      }

      archive.append(csv, { name: 'nakala.csv' });

      archive.finalize();

    } catch (e) {
      console.log("EXCEPTION : ", e);
      reject(e);
    }

  });

  const readedInt = setInterval(() => {
    if (fstream) {
      console.log("readed: ", fstream.bytesRead);
      if (progressCB) progressCB(fstream.bytesRead);
    }
  }, 1000);

  return new Promise((resolve, reject) => {
    p.then(r => {
      clearInterval(readedInt);
      if (progressCB && fstream) progressCB(fstream.bytesRead);
      resolve(r);
      return r;
    }).catch(err => {
      console.error("YAAAAAAAAA: ", err);
      clearInterval(readedInt);
      reject(err);
    });
  });
};

