// import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";

const access = promisify(fs.access);
const copy = promisify(ncp);

export const parseCSV = (options) => {
  // read csv from current folder
  console.log(options)
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
  console.log(data);
  return data;
};



