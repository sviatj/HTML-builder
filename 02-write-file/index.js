const folder = __dirname;
const path = require('path');
const process = require('process');
const fs = require('fs');
const absolutePath = path.join(folder, 'text.txt');

const writeStr = fs.createWriteStream(absolutePath, '', () => {
  console.log('\n' + 'text.txt was created' + '\n');
});

function question() {
  process.stdout.write('Input some text' + '\n\n');
  process.stdin.on('data', (data) => {
    let input = data.toString().trim();
    if (input === 'exit') {
      writeStr.end();
      console.log('\n' + 'Goodbye!' + '\n');
      process.exit();
    }
    writeStr.write('\n' + input + '\n');
    console.log('\n' + 'text.txt was modified' + '\n');
  });
  process.on('SIGINT', () => {
    console.log('\n' + 'Goodbye!' + '\n');
    process.exit();
  });
}
question();
