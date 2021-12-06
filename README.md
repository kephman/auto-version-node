# auto-version-node
Github Action to auto-increment Node package version

# How To Build This Repo
The following are notes taken from: [link](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action "https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action")

Checking in the `node_modules` directory can cause problems. This repo uses a tool called `@vercel/ncc` to compile the modules into one file, used for distribution.

1. Install `vercel/ncc` by running this command in a terminal: `npm i -g @vercel/ncc`

2. Compile the code: `npm run build`

This runs Vercel (e.g. `ncc build index.js --license licenses.txt`)

The compiled output will be in `dist/` along with the accompanying `dist/licenses.txt` file containing all the licenses of the `node_modules` being used.

3. Make sure the `main` paremter in `action.yml` is pointed to `dist/index.js` file: `main: 'dist/index.js'`

4. Commit the updates and tag the repo:
`git commit -am "FEAT: New Changes"
git tag -am "New Changes Made" v1.1
git push --follow-tags`
