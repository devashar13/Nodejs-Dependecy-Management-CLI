import arg from "arg";
import github from "./utils/githubAuth";
function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--input": String,
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
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  //   options = await prompForMissingOptions(options);
  console.log(options);
  let token = await github.getStoredGithubToken();
  if(!token) {
    token = await github.getPersonalAccesToken();
  }
  const x = await github.getContents(token);
  console.log(x);
}
