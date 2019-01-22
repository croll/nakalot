const https = require('https');
const archiver = require('archiver');
const querystring = require('querystring');


module.exports.upload = (filepath, csv, params) => {
  try {

    const gets = {
      email: params.email,
      key: params.key,
    }

    const req = https.request({
      host: 'www.nakala.fr',
      path: '/nakala/api/v1/data?' + querystring.stringify(gets),
      port: 443,
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
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

    const archive = archiver('zip', {
      zlib: { level: 0 } // Sets the compression level.
    });

    archive.on('warning', err => {
      if (err.code === 'ENOENT') {
        console.warn("archive warning: ", err);
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

    archive.pipe(req);

    for (let i=0; i<2; i+=1) {
      // append a file from string
      //archive.append('string cheese '+i+' !!!', { name: 'file'+i+'.txt' });
      archive.file('/usr/lib/WebKitPluginProcess2', { name: 'file'+i+'.bin' });
      //archive.file('/bin/ls', { name: 'file'+i+'.bin' });
    }

    archive.finalize();

  } catch (e) {
    console.log("EXCEPTION : ", e);
  }

};

