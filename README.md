# SLNT.stream

This repository contains all the source code for the web environment of SLNT.stream. This is supposed to be a private repository, so if you are here unauthorized then please leave and never think about this code again.

## Dependencies

### Node.JS
Node is required for installing NPM packages and for running various scripts. Please use the latest LTS release.

#### Installation guide
https://nodejs.org/

### Yarn
Yarn is used to ensure that your are using the correct version of each node module.

#### Installation guide
https://yarnpkg.com/en/docs/install

### VSCode + ESLint + Prettier
[VSCode](https://code.visualstudio.com/) is a lightweight but powerful source code editor. [ESLint](https://eslint.org/) takes care of the code-quality. [Prettier](https://prettier.io/) takes care of all the formatting.
#### Installation guide

1.  Install [VSCode](https://code.visualstudio.com/)
2.  Install [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
3.  Install [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
4.  Modify the VSCode user settings to add below configuration

    ```javascript
    "eslint.alwaysShowStatus": true,
    "eslint.autoFixOnSave": true,
    "editor.formatOnSave": true,
    "prettier.eslintIntegration": true
    ```

You can use a different editor that supports ESLint and Prettier if you want, but I recommend using VSCode for its simplicity (and it's free!).

## Quick start
```bash
# 1. Clone the repository
git clone https://slntmenno@bitbucket.org/slntstream/slnt-frontend-v2.git slnt-web

# 2. Go inside the directory
cd slnt-web

# 3. Install dependencies
yarn

# 4. Run development server
yarn dev
```

## Deployment
Please be careful when deploying to dev or production. These action can NOT be undone, so make sure that your code is tested and reviewed.

Deploy to development server (slnt.xyz):

```bash
yarn deploy-dev
```

Deploy to production server (slnt.stream):

```bash 
yarn deploy-prod
```

## Help
If you need any help setting up the repository, please reach out to Menno van Voorst ([menno@slnt.stream](mailto:menno@slnt.stream))
