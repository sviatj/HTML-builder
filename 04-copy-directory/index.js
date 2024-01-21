const folder = __dirname;
const path = require('path');
const fs = require('fs');
const absolutePath = path.join(folder, 'files');
const newFolderPath = path.join(folder, 'files-copy');

function createFolder() {
  fs.mkdir(newFolderPath, (err) => {
    if (err) {
      console.log('files-copy folder already exists');
      return;
    }
    console.log('files-copy folder was created');
  });
}

createFolder();

function readDirectory() {
  fs.readdir(absolutePath, (err, files) => {
    if (err) {
      console.log(err);
    }
    files.forEach((file) => {
      let eachPathToFile = path.join(absolutePath, `${file}`);
      let newPathToFile = path.join(newFolderPath, `${file}`);
      fs.copyFile(eachPathToFile, newPathToFile, (err) => {
        if (err) {
          console.log('Files already exist');
        }
        console.log(`${file} was copied to files-copy folder`);
      });
    });
  });
}

readDirectory();
