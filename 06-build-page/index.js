const folder = __dirname;
const path = require('path');
const fs = require('fs');
const projectPath = path.join(folder, 'project-dist');
const assetsPath = path.join(folder, 'assets');
const absoluteStylesPath = path.join(folder, 'styles');
const buildHtmlPath = path.join(projectPath, 'index.html');
const buildCSSPath = path.join(projectPath, 'style.css');
const buildAssetsFolder = path.join(projectPath, 'assets');
const componentsPath = path.join(folder, 'components');
const templatePath = path.join(folder, 'template.html');

const writeStrHTML = fs.createWriteStream(buildHtmlPath, '', () => {
  console.log('\n' + 'index.html was created' + '\n');
});
const writeStrCSS = fs.createWriteStream(buildCSSPath, '', () => {
  console.log('\n' + 'style.css was created' + '\n');
});

const readHeader = fs.createReadStream(
  path.join(componentsPath, 'header.html'),
);
const readFooter = fs.createReadStream(
  path.join(componentsPath, 'footer.html'),
);
const readArticles = fs.createReadStream(
  path.join(componentsPath, 'articles.html'),
);

function createDists() {
  fs.mkdir(projectPath, () => {
    console.log('project-dist folder was created');
  });
  fs.cp(assetsPath, buildAssetsFolder, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('project-dist/assets folder was copied');
  });
}

createDists();

function readTemplate() {
  const readStr = fs.createReadStream(templatePath);
  readStr.on('data', (data) => {
    let dataStr = data.toString();
    readHeader.on('data', function (chunk) {
      let headerTag = chunk.toString();
      let sub1 = dataStr.replace('{{header}}', headerTag);
      readFooter.on('data', function (chunk) {
        let footerTag = chunk.toString();
        let sub2 = sub1.replace('{{footer}}', footerTag);
        readArticles.on('data', function (chunk) {
          let articleTag = chunk.toString();
          let sub3 = sub2.replace('{{articles}}', articleTag);
          writeStrHTML.write(sub3);
        });
      });
    });
  });
}

readTemplate();

function readDirectory() {
  fs.readdir(absoluteStylesPath, (err, files) => {
    if (err) {
      console.log(err);
    }
    files.forEach((file) => {
      let eachPathToFile = path.join(absoluteStylesPath, `${file}`);
      let eachFileExtension = path.extname(eachPathToFile);
      if (eachFileExtension === '.css') {
        let readStr = fs.createReadStream(eachPathToFile);
        readStr.on('data', function (chunk) {
          writeStrCSS.write('\n' + chunk.toString() + '\n');
        });
      }
    });
    console.log(
      '.css files from styles folder were merged into project-dist/style.css',
    );
  });
}

readDirectory();
