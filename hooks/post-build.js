var fs = require('fs-extra');
var foldersToCopy = [
  {src: './dist', dest: '/var/www/rmhub.com/dist'},
  {src: './i18n', dest: './dist/i18n'}
];

// copies directory, even if it has subdirectories or files
function copyDir(src, dest) {
  fs.copy(src, dest, function (err) {
    if (err) return console.error(err)
    console.log(src + ' folder successfully copied')
  });
}
function emptyDir(src) {
  fs.emptyDir(src, function (err) {
    if (err) return console.error(err)
    console.log(src + ' folder successfully cleared')
  });
}
for (var i = foldersToCopy.length - 1; i >= 0; i--) {
  if (foldersToCopy[i].dest === '/var/www/rmhub.com/dist' ) {
    emptyDir(foldersToCopy[i].dest);
  }
  copyDir(foldersToCopy[i].src, foldersToCopy[i].dest);
}
