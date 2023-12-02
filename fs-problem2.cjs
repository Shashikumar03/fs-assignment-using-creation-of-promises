const fs = require("fs");
function userFsProblem2() {
  readingLipsumFile("./lipsum.txt")
    .then((data) => convertingToUpperCase(data))
    .then((upperData) => upperToLowerCaseToSentense(upperData))
    .then((filePath) => readingAndSorting(filePath))
    .then((filenamePath) => deleteFiles(filenamePath))
    .catch((err) => console.error(err));
}
// reading lipsum.txt file
function readingLipsumFile(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        console.log("lipsum file is read successfully");
        resolve(data);
      }
    });
  });
}
// converting lipsum file into upper case storing data in upper.txt file
function convertingToUpperCase(data) {
  return new Promise((resolve, reject) => {
    const upperData = data.toUpperCase();
    fs.writeFile("./upper.txt", upperData, (err) => {
      if (err) {
        reject(err);
      } else {
        fs.writeFile("./filename.txt", "upper.txt", (err) => {
          if (err) {
            reject(err);
          } else {
            console.log("converted to uppercase successfully");
            resolve(upperData);
          }
        });
      }
    });
  });
}
//converting upper to lower and then into sentences
function upperToLowerCaseToSentense(upperData) {
  return new Promise((resolve, reject) => {
    const lowerData = upperData.toLowerCase();
    const sentence = lowerData.split(".").join("\n").trim();
    fs.writeFile("./lower.txt", sentence, (err) => {
      if (err) {
        reject(err);
      } else {
        fs.appendFile("./filename.txt", "\nlower.txt", (err) => {
          if (err) {
            resolve(err);
          } else {
            console.log("upper to lower and then into sentence ");
            resolve("./lower.txt");
          }
        });
      }
    });
  });
}
// reading and sorting data
function readingAndSorting(filePath) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fs.readFile(filePath, "utf-8", (err, sentences) => {
        if (err) {
          reject(err);
        } else {
          const sort = sentences.split("\n").sort().join("\n");
          fs.writeFile("./sorting.txt", sort, (err) => {
            if (err) {
              reject(err);
            } else {
              fs.appendFile("./filename.txt", "\nsorting.txt", (err) => {
                if (err) {
                  reject(err);
                } else {
                  console.log("reading and sorting");
                  resolve("./filename.txt");
                }
              });
            }
          });
        }
      });
    }, 5000);
  });
}

// deleting files
function deleteFiles(filenamePath) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fs.readFile(filenamePath, "utf-8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          data.split("\n").forEach((path) => {
            fs.unlink(path, (err) => {
              if (err) {
                reject(err);
              } else {
                console.log(`${path} is deleted`);
                resolve(` deleted successfully`);
              }
            });
          });
        }
      });
    }, 7000);
  });
}

module.exports = userFsProblem2;
