# Sandbox

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
![Vercel](https://vercel-badge-fsohe4js4-iivanovw7.vercel.app/api/iivanovw7/sandbox)

Monorepo with multiple personal projects.

### What's inside?

This repository includes the following packages and apps:

### Apps

- `cv-app` [qwik](https://qwik.builder.io) contacts page.
- `cv-page` astro [website](apps/cv-page/README.md).
- `player-app` ott player web [app]().

### Requirements

- [NodeJS v18.16.0](https://nodejs.org/en/)
- [PNPM 8.x](https://pnpm.io/)
- [nvm](https://github.com/nvm-sh/nvm) (*optional*)

### Internal

- `eslint-config`: [Eslint](https://eslint.org/) configs with plugins.
- `ts-config`: [Typescript](https://www.typescriptlang.org/) ts configs.
- `vite-config`: [Vite](https://vitejs.dev/) configs.
- `types`: common types.
- `player-app-server`: server application stub.

### Packages

- `utils`: common utils.

### Clone

`git clone https://github.com/iivanovw7/player-app.git` <br />

### Scripts

- Install pnpm

```bash
  npm install --global pnpm
```

- Setup node version manager environment

```bash
   nvm use # or nvm install
```

- Pre-install script

```bash
  npm run preinstall
```

- Installing setup modules

```bash
  pnpm run bootstrap
```

- Post-installing scripts

```bash
  pnpm run postinstall
```

- Update / setup git hooks

```bash
  pnpm run prepare
```

- Install a package in a workspace

```bash
  pnpm add <package> --filter <workspace>
```

- Remove a package from a workspace

```bash
pnpm uninstall <package> --filter <workspace>
```

### Development

[Commitizen](https://github.com/commitizen/cz-cli) configuration

#### Development Workflow

1. [feature-branch] Stage modified files using `git add .`.
2. [feature-branch] Commit the files using git-cz package `git commit` (should trigger `git-cz` via hook).
    1. Choose the type of the commits (feat, refactor, fix, etc.).
    2. Provides a short description of the commits.
    3. (Optional) Provides a longer description.
    4. Determine whether the commit is a BREAKING CHANGES or not (by answering ‘y’ and fill up BREAKING CHANGES
       descriptions in the CLI).
    5. (Optional) Mentions the JIRA issue in (by answering ‘y’ and fill up the issue descriptions in the CLI).
3. [feature-branch] Push remote branch `git push origin <feature-branch>`.
4. Create a Pull Request to dev branch.

### License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2023 © <a href="https://github.com/iivanovw7/sandbox" target="_blank">sandbox</a>

