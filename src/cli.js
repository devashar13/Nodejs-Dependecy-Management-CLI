import arg from "arg";
import inquirer from "inquirer";
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

// const prompForMissingOptions = async (options) => {
//   // check if the name ends with .csv
//   if (options.skipPrompts) {
//     return {
//       ...options,
//       template: options.fileInput || defaultTemplate,
//     };
//   }
//     if (options.fileInput.length > 0 && options.fileInput.substr(-4) == ".csv") {
//       return {
//         ...options,
//         template: options.fileInput || defaultTemplate,
//       };
//     }
//   const questions = [];
//   if (!options.template) {
//     questions.push({
//       type: "list",
//       name: "template",
//       message: "Which template would you like to use?",
//       choices: ["js", "ts"],
//       default: defaultTemplate,
//     });
//   }
//   if (!options.git) {
//     questions.push({
//       type: "confirm",
//       name: "git",
//       message: "Would you like to initialize a git repository?",
//       default: false,
//     });
//   }

//   const answers = await inquirer.prompt(questions);
//   return {
//     ...options,
//     template: options.template || answers.template,
//     git: options.git || answers.git,
//   };
// };

export function cli(args) {
  let options = parseArgumentsIntoOptions(args);
//   options = await prompForMissingOptions(options);
  console.log(options);
}
