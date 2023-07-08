## player-app

In development. Will contain OTT media service website.

---

### Table of Contents

- [Requirements](#requirements)
- [Libs](#libs)
- [Development](#development)
- [Files](#files)
- [ToDo](#todo)
- [License](#license)

---

### Requirements

- [NodeJS v19.8.1](https://nodejs.org/en/)
- [PNPM 8.x](https://pnpm.io/)
- [nvm](https://github.com/nvm-sh/nvm) (*optional*)

#### Secrets

Should have `.env` file in root folder with [TMDB](https://www.themoviedb.org/) access token.

```bash
TMDB_TOKEN='TMDB_TOKEN'
```

---

### Libs

Technologies used

- [solidjs](https://docs.solidjs.com)
- [postcss](https://github.com/postcss/postcss)
- [Vitest](https://vitest.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [ESLint](https://eslint.org)
- [vanilla-extract-css](https://vanilla-extract.style/)

---

### Development

- Running in dev mode: <br />
  `pnpm run dev` <br />

  test user credentials
  ```typescript
    username: 'user@email.com'
    password: 'user'
  ```
- Generate typedoc documentation inside `./build/doc` folder <br />
  `pnpm doc` <br />
- Create production build: <br />
  `pnpm run build` <br />
- Create production build with bundle analyzer report <br />
  `pnpm run build:analyze` <br />
- Create production build and run preview <br />
  `pnpm run build:view` <br />
- Serve last production build <br />
  `pnpm run view` <br />
- Run all linting <br />
  `pnpm run lint` <br />
- Run all tests <br />
  `pnpm run test` <br />
- Run all tests with verbose logger mode <br />
  `pnpm test -- --reporter='verbose'` <br />
- Run all tests with coverage report <br />
  `pnpm run test:coverage` <br />
- Run all tests in watch mode <br />
  `pnpm run test:watch` <br />
- Complete reinstall <br />
  `pnpm run reinstall` <br />

#### Localization

Localization messages location patterns:

- `src/[Layer]/lib/messages`
- `src/shared/translations/common.ts`

##### Localization scripts

- Extract messages and puts them into temp `src/shared/translations/lang.json` file <br />
  `extract-messages` <br />
- Compiles messages and into temp `src/shared/translations/[Locale].json` file <br />
  `compile-messages` <br />
- Combined localizations script with cleanup <br />
  `create-translations` <br />

---

### Files

Contains information about main configuration files and folders.

| Folder                | Comment                                                               |
|:----------------------|:----------------------------------------------------------------------|
| `./.nvmrc`            | Contains current `Node.js` version.                                   |
| `./assets`            | Folder contains application resources (images, svg, fonts and etc...) |
| `./src/**/*`          | Main application folder.                                              |
| `./src/main.tsx`      | Entry point, renders application.                                     |
| `./src/app`           | `Layer` Initializing the application (context, providers, etc...).    |
| `./src/pages`         | `Layer` Contains application pages.                                   |
| `./src/pages/routing` | Contains application routing config.                                  |
| `./src/entities`      | `Layer` Contains business entities.                                   |
| `./src/shared`        | `Layer` Reusable infrastructure code (UIKit, libs, API, ...).         |
| `./src/widgets`       | `Layer` Complex page widgets, composition of Entities and Features.   |                        |
| `./src/features`      | `Layer` Elements that enable users to use this feature.               |

---

### ToDo

- ~~Base application structure.~~ <br/>
- Add locale switcher <br />
- ~~Setup vite for prod and dev, setup loaders and npm scripts.~~ <br/>
- ~~Setup linting~~ <br/>
- Add locale support <br />
- Remove <Img /> `size` property <br />
- Test production view script. <br/>
- Add graphql test server <br />
- Restore playable banner component <br />
- Setup components unit tests <br />
- Setup test dedicated lint config <br />
- ~~Configure js/ts linter.~~ <br/>
- ~~Global spinner~~ <br/>
- Global loader ?? <br/>
- Setup integration tests <br />
- Setup e2e tests <br />
- Browse page: Header controls <br/>
- Browse page: Assets requests <br/>
- Browse page: Playable header <br/>
- Browse page: Base assets slider <br/>
- Browse page: Playable asset preview <br/>
- Player component & store <br />
- Browse page: Mobile version <br />
- Browse page: Mobile menu <br />
