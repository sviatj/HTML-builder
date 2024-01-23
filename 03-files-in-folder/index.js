const folder = __dirname;
const path = require('path');
const fs = require('fs');
const absolutePath = path.join(folder, 'secret-folder');

function readDirectory() {
  fs.readdir(absolutePath, (err, files) => {
    if (err) {
      console.log(err);
    }
    files.forEach((file) => {
      let eachPathToFile = path.join(absolutePath, `${file}`);
      fs.stat(eachPathToFile, (err, stats) => {
        if (err) {
          console.log(err);
        }
        if (stats.isFile()) {
          let eachFileName;
          let eachFileExtension = path.extname(eachPathToFile);
          let eachFileSize = stats.size;
          eachFileName = file.split('.')[0];
          if(file.charAt(0) === '.') {
            eachFileName = file.split('.')[1];
          }
          console.log(
            eachFileName +
              ' - ' +
              eachFileExtension.slice(1) +
              ' - ' +
              eachFileSize.toLocaleString('de-DE') +
              'kb',
          );
        }
      });
    });
  });
}
readDirectory();
