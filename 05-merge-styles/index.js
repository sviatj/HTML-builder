const folder = __dirname;
const path = require('path');
const fs = require('fs');
const absoluteStylesPath = path.join(folder, 'styles');
const projectPath = path.join(folder, 'project-dist');
const bundlePath = path.join(projectPath, 'bundle.css');


const writeStr = fs.createWriteStream(bundlePath, '', () => {
  console.log('\n' + 'bundle.css was created' + '\n');
});

function readDirectory() {
  fs.readdir(absoluteStylesPath, (err, files) => {
    if (err) {
      console.log(err);
    }
    files.forEach((file) => {
      let eachPathToFile = path.join(absoluteStylesPath, `${file}`);
      let eachFileExtension = path.extname(eachPathToFile);
      if(eachFileExtension === '.css') {
        let readStr = fs.createReadStream(eachPathToFile);
        readStr.on('data', function (chunk) {
          writeStr.write('\n' + chunk.toString() + '\n');
        });
      }
    });
    console.log('.css files from styles folder were merged into project-dist/bundle.css');
  });
}

readDirectory();
