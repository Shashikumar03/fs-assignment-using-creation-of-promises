const fs = require("fs");
const UPPER_TEXT_PATH = "upper.txt";
const LOWER_TXT_PATH = "lower.txt";
const SORT_TXT_PATH = "sorting.txt";

function userFsProblem2(LIPSUM_FILE) {
  readingLipsumFile(LIPSUM_FILE)
    .then((data) => convertingToUpperCase(data))
    .then((upperData) => upperToLowerCaseToSentense(upperData))
    .then((filePath) => readingAndSorting(filePath))
    .then((filenamePath) => deleteFiles(filenamePath))
    .catch((err) => {
      throw new Error(`${err.message}`);
    });
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
    fs.writeFile(UPPER_TEXT_PATH, upperData, (err) => {
      if (err) {
        reject(err);
      } else {
        fs.writeFile("./filename.txt", UPPER_TEXT_PATH, (err) => {
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
    fs.writeFile(LOWER_TXT_PATH, sentence, (err) => {
      if (err) {
        reject(err);
      } else {
        fs.appendFile("./filename.txt", `\n${LOWER_TXT_PATH}`, (err) => {
          if (err) {
            resolve(err);
          } else {
            console.log("upper to lower and then into sentence ");
            resolve(LOWER_TXT_PATH);
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
          fs.writeFile(SORT_TXT_PATH, sort, (err) => {
            if (err) {
              reject(err);
            } else {
              fs.appendFile("./filename.txt", `\n${SORT_TXT_PATH}`, (err) => {
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
          const a = data.split("\n").map((path) => {
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
