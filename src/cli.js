import arg from "arg";
import github from "./utils/githubAuth";
import helper from "./utils/helpers";
import githubActions from './github';
function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--input": String,
      "-u":Boolean,
      "--help": Boolean,
      "-i": "--input",
      "-h": "--help",
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    fileInput: args["--input"] || "",
    library: args._[0],
    update: args["-u"] || false,
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  console.log(options);
  //   options = await prompForMissingOptions(options);
  let token = await github.getStoredGithubToken();
  if(!token) {
    token = await github.getPersonalAccesToken();
  }
  // const {libversions,data} = await github.getContents(token,options);
  // await helper.createTable(libversions);
  const makePR = await githubActions.makePR(token,options);
}
