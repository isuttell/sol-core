# Sol.js Core
Node.js backend framework

[![Build Status](https://travis-ci.org/isuttell/sol-core.svg)](https://travis-ci.org/isuttell/sol-core)

- - -

## Description
An experimental frame with the goal to be quick and lean to setup simple node.js
based websites. This is only one piece of the framework. The other peice resides
in [Sol.js](https://github.com/isuttell/sol).

## Documentation

Documentation can be found at [http://isuttell.github.io/sol](http://isuttell.github.io/sol)

## Development

### Coding Standards

Sol.js uses Google coding standards with the help of [grunt-jscs](https://github.com/jscs-dev/grunt-jscs). The default grunt task watches for any file changes and automatically runs a coding standard check.

### Testing and Linting

The default Grunt task watches for any `*.js` changes and runs linting, coding standards checks, and Jasmine unit tests.

### Git Hooks

At the moment, theres one `pre-commit` git hook that is stored in the repository. `pre-commit` runs linting, coding standards checks and unit tests before each commit to ensure code quality. To use the hook, run `./bin/create-hook-symlinks` from the project directory. This only needs to be run once. Additional hooks may be saved in the `githooks` directory and will automatically be run in the future for everyone working on the repo.