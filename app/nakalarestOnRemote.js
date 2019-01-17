const http = require('http');


//module.exports = function() { console.log("plop")};
module.exports.plop = function() { console.log("plop")};

module.exports.upload = function(filepath, csv) {
  try {
    console.log("upload");
    console.log("http: ", http);
    console.log("http.request: ", http.request);

    const req = http.request({
      host: '127.0.0.1',
      path: '/test',
      port: 8080,
      method: 'POST',
    });

    console.log("hop !");
    /*

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



    const archiver = require('archiver');
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

    for (let i=0; i<1000; i+=1) {
      // append a file from string
      //archive.append('string cheese '+i+' !!!', { name: 'file'+i+'.txt' });
      archive.file('/usr/lib/WebKitPluginProcess2', { name: 'file'+i+'.bin' });
    }

    archive.finalize();
    */
  } catch (e) {
    console.log("EXCEPTION : ", e);
  }

};

