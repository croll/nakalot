//import { remote } from 'electron';
//const plop = remote.require('./nakalarestOnRemote');


var startTime, endTime;

function start() {
  startTime = new Date();
};

function end() {
  endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds
  var seconds = Math.round(timeDiff);
  console.log(seconds + " seconds");
}


const fs = require('fs');
let fd = fs.openSync('/home/nicolas/Win10_1809Oct_French_x64.iso', 'r');
console.log("reading from fd...", fd);
let ar=new Uint8Array(1024*1024);
let readed = 0;
start();
while (readed = fs.readSync(fd, ar, 0, 1024*1024, null) > 0) {
  //console.log("readed: ", readed);
}
fs.closeSync(fd);
end();




const archiver = require('archiver');
console.log("archiver: ", archiver);

const plop = require('electron').remote.require('./nakalarestOnRemote');

console.log("plop :", plop);
plop.plop();

plop.upload('/usr/lib/WebKitPluginProcess2', "pouet");

export default plop;
