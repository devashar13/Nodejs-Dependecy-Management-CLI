import arg from "arg";
import github from "./utils/githubAuth";
import helper from "./utils/helpers";
import githubActions from "./github";
function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--input": String,
      "-u": Boolean,
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
  //   options = await prompForMissingOptions(options);
  let token = await github.getStoredGithubToken();
  if (!token) {
    token = await github.getPersonalAccesToken();
  }
  if (!options.library) {
    console.log("Please provide a library name");
    return;
  }
  if (options.fileInput == "") {
    console.log("Please provide a csv file containing the github repositories");
    return;
  }
  const { libversions, data } = await github.getContents(token, options);

  if (!options.update) {
    await helper.createTable(libversions);
    return;
  }
  if (options.update) {
    await helper.createTable(libversions);
    const makePR = await githubActions.makePR(token, options);
    await helper.createUpdateTable(libversions,makePR);
  }
}
