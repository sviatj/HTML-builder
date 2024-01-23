const folder = __dirname;
const path = require('path');
const fs = require('fs');
const absolutePath = path.join(folder, 'files');
const newFolderPath = path.join(folder, 'files-copy');

fs.mkdir(newFolderPath, () => {
  console.log('files-copy folder was created');
});

function createFolder() {
  fs.readdir(newFolderPath, (err, files) => {
    if(err) {
      console.log('');
    }
    files.forEach((file) => {
      let newPathToFile = path.join(newFolderPath, `${file}`);
      fs.unlink(newPathToFile, (err) => {
        if(err) {
          console.log(err);
        }
        console.log('');
      })
      });
    })
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
      fs.copyFile(eachPathToFile, newPathToFile, () => {
        console.log(`${file} was copied to files-copy folder`);
      });
    });
  });
}

readDirectory();
