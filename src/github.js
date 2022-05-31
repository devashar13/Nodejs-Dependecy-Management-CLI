const { Octokit } = require("@octokit/rest");
import helpers from "./utils/helpers";
export default {
  makePR: async (token, options) => {
    const csvContents = await helpers.parseCSV(options);
    const octokit = new Octokit({
      auth: token,
    });
    const user = await octokit.rest.users.getAuthenticated();
    const userName = user.data.login;

    for (let i = 0; i < csvContents.length; i++) {
      if (csvContents[i].name == "") {
        continue;
      }
      const repoUser = csvContents[i].repo
        .replace("https://github.com/", "")
        .split("/");
    try{
        const check_collab = await octokit.rest.repos.checkCollaborator({
            owner: repoUser[0],
            repo: repoUser[1],
            username: userName,
          });
        if(check_collab.data.status == 204){
            console.log("You are collaborator of this repository, we will create a bracnch");
            await createBranch()
        }
    }catch(e){
        if(e.status == 403){
            console.log("You are not collaborator of this repository, we will fork and make a pr");
            await createFork()
        }
    }
      //   const { data } = await octokit.repos.get({
      //     owner: "sahil-sharma",
      //     repo: repo,
      //   });
      //   const { owner, name } = data;
      //   const { data: branch } = await octokit.repos.getBranch({
      //     owner: owner.login,
      //     repo: name,
      //     branch: branchName,
      //   });
      //   const { commit } = branch;
      //   const { sha } = commit;
      //   const { data: pr } = await octokit.pulls.create({
      //     owner: owner.login,
      //     repo: name,
      //     head: branchName,
      //     base: "master",
      //     title: "Update dependencies",
      //     body: "This PR is created by sahil-sharma",
      //   });
      //   const { number } = pr;
      //   const { data: prCommit } = await octokit.pulls.listCommits({
      //     owner: owner.login,
      //     repo: name,
      //     pull_number: number,
      //   });
      //   const { sha: prSha } = prCommit[0];
      //   const { data: status } = await octokit.repos.createStatus({
      //     owner: owner.login,
      //     repo: name,
      //     sha: prSha,
      //     state: "success",
      //     description: "All good",
      //     context: "update-dependencies",
      //   });
      //   return status;
    }
  },
};
