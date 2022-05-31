import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
var Table = require('cli-table');

const access = promisify(fs.access);
const copy = promisify(ncp);
export default {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  directoryExists: (filePath) => {
    return fs.existsSync(filePath);
  },
  parseCSV :(options) => {
    // read csv from current folder
    if (!options.fileInput) {
      console.log("Please provide a csv file");
      return;
    }
    const csv = fs.readFileSync(options.fileInput, "utf8");
    const lines = csv.split("\n");
    const headers = lines[0].split(",");
    const data = lines.slice(1).map((line) => {
      const values = line.split(",");
      return values.reduce((obj, value, index) => {
        obj[headers[index]] = value;
        return obj;
      }, {});
    });
    return data;
  
},
createTable:(repoStats) => {
  const stats = []
  const x = Object.keys(repoStats)
  for (let i = 0; i < x.length; i++) {
    stats.push([x[i],...repoStats[x[i]]])
  }
   const table = new Table({
     head: ['name','repo',"version","version_satisfied"],
     colWidths: [300, 20, 10,30]
   });
   stats.forEach((repo) => {
      table.push(repo)
   });

   console.log(table.toString());
}
};

