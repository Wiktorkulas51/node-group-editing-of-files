const fs = require("fs");
const path = require("path");
const argv = require("./argv");
const sortByDate = require("./utiles").sortByDate;
const newFileName = require("./utiles").newFileName;

// node index.js --dir 'files' --ext 'png' --format 'photo-$$$'

// UWAGA! W systemie Windows w powyższym poleceniu zamień
// apostrofy na cudzysłowy!

if (!argv.validate(["dir", "ext", "format"])) {
  throw new Error("Nie podano poprwanych argumentów");
}
// console.log("argv.get", argv.get("dir"));

const dir = path.join(__dirname, argv.get("dir"));

fs.readdir(dir, (err, files) => {
  if (err) {
    console.log(`readdir error: ${err.message}`);
  }
  let vaildFiles = files.filter((file) => {
    return path.extname(file).slice(1) === argv.get("ext");
  });
  sortByDate(vaildFiles, dir);
  console.log(vaildFiles);

  vaildFiles.forEach((file, index) => {
    try {
      fs.renameSync(
        path.join(dir, file),
        path.join(
          dir,
          newFileName(argv.get("format"), argv.get("ext"), index + 1)
        )
      );
    } catch (err) {
      throw new Error(
        `nie mozna bylo zmienic nazwy pliku ${file}\n błąd: ${err.message}`
      );
    }
  });
});
