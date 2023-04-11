# README

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for?

- workspace app
- 1.0.0
- [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up?

- Clone the repository(develop branch)
- Run **yarn** or **yarn install** to install packages that project need

```bash
yarn install
```

- Run **yarn build** to build the shared project

```bash
yarn build
```

- You should run **yarn [project]:pods** to link package for ios

```bash
yarn [project]:pods
```

- If you want to start metro run **yarn patient:start**

```bash
yarn [project]:start
```

- If you want run in special platform eg: ios. You should run **yarn patient:ios**

```bash
yarn [project]:ios
```

### Deploying the app to QC

- We use git tag feature to trigger the CI build
- If you want to send a build to QC. Your pull request must be accept merge to qc branch first. After that you can trigger build by create a tag with template:

`[project]_android_qc_v*`

- If you want to send a build to QC with environment staging. Your pull request must be accept merge to staging branch first. After that you can trigger build by create a tag with template:

`[project]_android_staging_v*`

