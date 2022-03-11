# Introduction

The folder structure and module management of an application can become very complex and cumbersome as the application grows. This growth can quickly become difficult to track. A good way to structure the app is to write it in a per-feature basis, where each feature lives on its own place.

A common and simple pattern is to split the application in different folders, but this can be taken further by creating different packages, that can be shared among different applications where each package represents a particular feature, component or functionality.


# run the application
Nodejs v17.3.1

On the root level, run:
- npm install 
- npm run build-lib-all
- cd/Container-Pages/plp and npm run dev:headless:esi
- any MFE cd/MFE/product-summary and run npm run build:local && npm run start:headless 
- Install modheaders on chrome and add the following headers
- x-monorepo-realm - amido
- x-monorepo-language - en
- x-monorepo-territory - gb
- test-with-local-esi - true
- go to http://localhost:3009/shop/gender-women-productaffiliation-coatsandjackets

# Strategy

- To reduce the amount of repeated boilerplate code that has to be written in multiple packages/app and in different repositories.

- To create one source of truth.

- Sharing code and code reusability to become easier, because every package belongs to the same repository and follows the same structure and development process.

- Refactoring at large scale become very easy for example updating theme, updating global lint settings.


The structure of the monorepo is as follows (sample):

```
├─ tsconfig.json                
├─ package.json                 / descriptor of common dependencies and entry point 
                                for lifecycle scripts
├─ packages/
├─── components     	 	    // React components
....
├───── Accordion     	 	    // a component
├─────── package.json           // descriptor of the component's structure and lifecycle
├─────── src                    // source code
├───────── index.ts             // entry point of the component
├───────── index.test.ts 	    // Jest unit tests
├─────── .babelrc.js 	        // babel config for latest ES features in code
├─────── .eslint.js 	        // eslint config for static analysis
├─────── .npmrc 	            // config for the private repo
├─────── index.ts 			    // optional entry point 
├─────── rollup.config.js	    // Rollup config for building artifacts from the module
├─────── tsconfig.build.json	// tsconfig that will be used by Rollup for building
├─────── tsconfig.json	        // tsconfig to test, run and lint the package
├─────── ...	                // any other file needed to test, run and lint
....
├─── eventservice			    // custom package (as above)
├─── settingsSDK		        // custom package (as above)
....
├─── config                     // config type of packages
....
├───── eslint                   // example package in JS for global eslint
├─────── package.json           // descriptor of the package's structure and lifecycle
├─────── src                    // source code
├───────── index.js             // entry point of the component
├───────── index.test.js 	    // Jest unit tests
├─────── .babelrc.js 	        // babel config for latest ES features in code if needed
├─────── .npmrc 	            // config for the private repo
├─────── rollup.config.js	    // Rollup config for building artifacts from the module
├─────── ...	                // any other file needed to test, run and lint
....
```

# Usage
### Configuration

#### Package.json

- devDependencies: these are the dependencies you need to test, lint and work with the package -> these will not be bundled by Rollup hence not shipped with your package

- dependencies: these are modules (dependencies) that you are importing in your codebase -> these will be bundled by Rollup (with the appropriate tree-shaking) and shipped with your amazing package

- peerDependencies: these are dependencies (modules) that you are importing and using in your codebase but that you are assuming the project importing your package will already have (in the specified version). Anything specified in the ```peerDependencies``` will have to be ALSO listed in the ```devDependencies``` or ```dependencies``` or in the root level's ```package.json```'s ```dependencies```

### Why have we automated this?

We think it's good practice to test changes before publishing it to the registry. so you know it's free of errors

## Versioning

We are versioning as a seperate script in order to support publishing from a CI pipeline, and to automate the creation of changelogs based on the commit history. This is to ensure we don't rely on contributors publishing from local.

From root, run: `npm run patch` or `npm run minor` or `npm run major` depending on the extet of your changes.

### What does `version` do?

1. Identifies packages that have been updated since the previous tagged release.
2. Bumps the version based on the Conventional Commits Specification
3. Updates CHANGELOG.md and updates the package.json if needed
4. Commits those changes and tags the commit.
5. Pushes to the git remote.
## Conventional Commits

We generate our CHANGELOGS.md automagically based on the `git commit`. The commit itself communicates the **WHAT**, whereas commit message communicates the **WHY**.

### What is a commit?

[`git commit`](https://git-scm.com/docs/git-commit) is a git command that is used to record your changes to the local repository.

### Why are we using Conventional Commits?

* Automatically generating CHANGELOGs.
* Automatically determining a semantic version bump (based on the types of commits landed).
* Communicating the nature of changes to teammates, the public, and other stakeholders.
* Triggering publish processes.
* Making it easier for people to contribute to your projects, by allowing them to explore a more structured commit history.

_Source: https://www.conventionalcommits.org/en/v1.0.0/#why-use-conventional-commits_

### How do we enforce Conventional Commits?

We use precommit hooks with [Husky](https://github.com/typicode/husky) and [commitlint](https://github.com/conventional-changelog/commitlint).

### What are the commit conventions format?

`type(scope?): subject`

Where:

* [`'type'=`](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#type-enum)
  ```js
  [
    'build',
    'ci',
    'chore',
    'docs',
    'feat',
    'fix',
    'perf',
    'refactor',
    'revert',
    'style',
    'test'
  ];
  ```
* `scope?=` optional, addresses the specific area of change, or feature
* `subject=` why you are making the commit in the first place

Examples:
`chore: to run tests on travis ci`

`fix(server): to send cors headers`

`feat(blog): to add comment section`

## Publishing

publishing will happen in the pipeline after a branch is merged to master.
