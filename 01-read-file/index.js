const folder = __dirname;
const path = require('path');
const fs = require('fs');
const absolutePath = path.join(folder, 'text.txt');
const readStr = fs.createReadStream(absolutePath);

readStr.on('data', function (chunk) {
  console.log(chunk.toString());
});
