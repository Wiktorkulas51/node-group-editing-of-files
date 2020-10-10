const path = require("path");
const fs = require("fs");

function sortByDate(files, dir) {
  files.sort((a, b) => {
    const aStat = fs.statSync(path.join(dir, a));
    const bStat = fs.statSync(path.join(dir, b));
    return aStat.birthtime.getTime() - bStat.birthtime.getTime();
  });
  return files;
}

function newFileName(format, ext, index) {
  const formatted = format.replace(/(\$+)/, (match) => {
    let stringMatch = match.length;

    const diff = stringMatch - String(index).length;

    return "0".repeat(diff < 0 ? 0 : diff) + index;
  });
  const newFormatted = formatted + "." + ext;
  console.log(newFormatted);
  return newFormatted;
}

module.exports = {
  sortByDate: sortByDate,
  newFileName: newFileName,
};
