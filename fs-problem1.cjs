const fs = require("fs");

function createAndDeleteFiles(mkdirPath, n) {
  if (n === 0) {
    console.log("all operation completed");
    return;
  }
  createDir(mkdirPath)
    .then((dirPath) => createFile(`${dirPath}/${n}.json`))
    .then((filePath) => deleteFile(filePath))
    .then(() => createAndDeleteFiles(mkdirPath, --n))
    .catch((err) => console.log(err));
}

function createFile(filePath) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fs.writeFile(filePath, "hello", (err) => {
        if (err) {
          reject(err);
        } else {
          console.log(`${filePath}  file is created`);
          resolve(filePath);
        }
      });
    }, 3000);
  });
}

function createDir(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.mkdir(directoryPath, { recursive: true }, (err) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(directoryPath);
      }
    });
  });
}

function deleteFile(filePath) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fs.unlink(filePath, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log(`${filePath} file is deleted`);
          resolve(filePath);
        }
      });
    }, 5000);
  });
}
module.exports = createAndDeleteFiles;
