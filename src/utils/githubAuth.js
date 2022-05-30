import CLI from 'clui';
import Configstore from 'configstore';
import Octokit from '@octokit/rest';
const Spinner = CLI.Spinner;
import {createBasicAuth} from "@octokit/auth-basic";
import inquirer from 'inquirer';
const pkg = require('../package.json');

const conf = new Configstore(pkg.name);
module.exports = {
  askGithubCredentials: async () => {
    const questions = [
      {
        name: "username",
        type: "input",
        message: "Enter your GitHub username or e-mail address:",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter your username or e-mail address.";
          }
        },
      },
      {
        name: "password",
        type: "password",
        message: "Enter your password:",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter your password.";
          }
        },
      },
    ];
    return inquirer.prompt(questions);
  },
  getInstance: () => {
    return octokit;
  },

  getStoredGithubToken: () => {
    return conf.get("github.token");
  },

  getPersonalAccesToken: async () => {
    const credentials = await inquirer.askGithubCredentials();
    const status = new Spinner("Authenticating you, please wait...");

    status.start();

    const auth = createBasicAuth({
      username: credentials.username,
      password: credentials.password,
      async on2Fa() {
        // TBD
      },
      token: {
        scopes: ["user", "public_repo", "repo", "repo:status"],
        note: "ginit, the command-line tool for initalizing Git repos",
      },
    });

    try {
      const res = await auth();

      if (res.token) {
        conf.set("github.token", res.token);
        return res.token;
      } else {
        throw new Error("GitHub token was not found in the response");
      }
    } finally {
      status.stop();
    }
  },
};
