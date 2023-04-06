const fs = require('fs');

// create a directory
function createDirectory(path) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('Directory created successfully!');
      }
    });
  });
}

function directoryExists(path) {
  return new Promise((resolve, reject) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

module.exports.createDirectory = createDirectory
module.exports.directoryExists = directoryExists