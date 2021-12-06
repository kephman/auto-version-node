import core from '@actions/core';
import github from '@actions/github';

const MASTER = 'master';

async function run() {
    try {
        const accessToken = core.getInput('access-token');
        const branchName = core.getInput('branch-name');
        const packageVersion = core.getInput('package-version');
        const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');

        if (typeof accessToken !== 'string' || !accessToken.length) {
            throw new Error('Parameter "access-token" is invalid.');
        }

        if (typeof branchName !== 'string' || !branchName.length || branchName === MASTER) {
            throw new Error('Parameter "branch-name" is invalid.');
        }

        if (typeof owner !== 'string' || !owner.length) {
            throw new Error('The "GITHUB_REPOSITORY" owner is invalid.');
        }

        if (typeof repo !== 'string' || !repo.length) {
            throw new Error('The "GITHUB_REPOSITORY" repo is invalid.');
        }

        const octokit = github.getOctokit(accessToken);

        core.info(`Owner: ${owner} | Repo: ${repo}`);

        await octokit.rest.pulls.create({
            owner,
            repo,
            head: branchName,
            base: MASTER,
            title: `Automated version update: ${packageVersion}`
        });

        core.info('Pull Request created!');
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
