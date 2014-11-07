# Sol.js Core

[![Build Status](https://travis-ci.org/isuttell/sol-core.svg)](https://travis-ci.org/isuttell/sol-core)
[![Coverage Status](https://img.shields.io/coveralls/isuttell/sol-core.svg)](https://coveralls.io/r/isuttell/sol-core)
[![Dependency Status](https://david-dm.org/isuttell/sol-core.svg)](https://david-dm.org/isuttell/sol-core)
[![devDependency Status](https://david-dm.org/isuttell/sol-core/dev-status.svg)](https://david-dm.org/isuttell/sol-core#info=devDependencies)

- - -

## Description
An experiment to create a framework that is quick to setup, and easy to test. The project is spit into two parts. The other repo can be found at [https://github.com/isuttell/sol](https://github.com/isuttell/sol).

## Documentation

Documentation can be found at [http://isuttell.github.io/sol](http://isuttell.github.io/sol)

## Development

### Coding Standards

Sol.js uses Google coding standards with the help of [grunt-jscs](https://github.com/jscs-dev/grunt-jscs). The default grunt task watches for any file changes and automatically runs a coding standard check.

### Testing and Linting

The default Grunt task watches for any `*.js` changes and runs linting, coding standards checks, and Jasmine unit tests.

### Git Hooks

At the moment, theres one `pre-commit` git hook that is stored in the repository. `pre-commit` runs linting, coding standards checks and unit tests before each commit to ensure code quality. To use the hook, run `./bin/create-hook-symlinks` from the project directory. This only needs to be run once. Additional hooks may be saved in the `githooks` directory and will automatically be run in the future for everyone working on the repo.
