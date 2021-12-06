const core = require('@actions/core');
const github = require('@actions/github');

try {
    const accessToken = core.getInput('access-token');
    const branchName = core.getInput('branch-name');
    const [owner, repo] = branchName.split('/');

    const octokit = github.getOctokit(accessToken);

    core.info(`Owner: ${owner} | Repo: ${repo}`);
} catch (error) {
    core.setFailed(error.message);
}
