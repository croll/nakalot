
<div align="center">

![Nakalot (mass upload to Nakala)]

</div>

## Install

- **If you have installation or compilation issues with this project, please see [this debugging guide](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400)**

This project is based on electron react boilerplate (https://github.com/electron-react-boilerplate/electron-react-boilerplate/)

First, clone the repo via git:

```bash
git clone --depth 1 --single-branch --branch master https://github.com/croll/nakalot.git
```

And then install the dependencies with yarn.

```bash
$ cd nakalot
$ yarn
```

## Run

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ yarn dev
```

If you don't need autofocus when your files was changed, then run `dev` with env `START_MINIMIZED=true`:

```bash
$ START_MINIMIZED=true yarn dev
```

## Packaging

To package apps for the local platform:

```bash
$ yarn package
```

To package apps for all platforms:

First, refer to the [Multi Platform Build docs](https://www.electron.build/multi-platform-build) for dependencies.

Then,

```bash
$ yarn package-all
```

To package apps with options:

```bash
$ yarn package --[option]
```

To run End-to-End Test

```bash
$ yarn build-e2e
$ yarn test-e2e

# Running e2e tests in a minimized window
$ START_MINIMIZED=true yarn build-e2e
$ yarn test-e2e
```

:bulb: You can debug your production build with devtools by simply setting the `DEBUG_PROD` env variable:

```bash
DEBUG_PROD=true yarn package
```

## Maintainers

- [Nicolas Dimitrijevic](https://github.com/niclone)
- [Christophe Beveraggi](https://github.com/beve)

## License

MIT ©
