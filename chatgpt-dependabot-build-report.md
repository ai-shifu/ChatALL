# Dependabot PR build report

Generated: 2026-07-31T19:35:35.280940+00:00

Environment: GitHub-hosted Ubuntu runner, Node.js 20, clean `npm ci`.

The repository has no automated test script. The checks below cover dependency installation, Vue production build, ESLint, and selected Linux Electron packaging.

## Web build and lint

| Target | Commit | `npm ci` | `npm run build` | `npm run lint` |
|---|---|---|---|---|
| main | `6d089c2ab72d` | failure | skipped | skipped |
| 1073 | `da3d7a9d1071` | success | success | success |
| 1072 | `e7253bec23fd` | success | failure | success |
| 1071 | `00b143650e2f` | success | success | success |
| 1068 | `b11af3bfbc75` | success | success | success |
| 1067 | `43cc1a0cec51` | success | success | success |
| 1066 | `82154be3e41e` | success | success | success |
| 1065 | `220f13a78663` | success | success | success |
| 1064 | `9be9d58afd0a` | success | success | success |
| 1063 | `9d729117baab` | success | success | success |
| 1062 | `b56efb9330b3` | success | success | success |
| 1061 | `d8a1d7d20cc6` | success | success | success |
| 1060 | `6f4a94a8767a` | success | success | success |
| 1059 | `c509a1311b53` | success | success | success |
| 1055 | `169311b1217e` | success | success | success |
| 1043 | `71194aa20e85` | success | success | success |
| 1040 | `aa1582216fed` | success | success | success |

## Linux Electron packaging

| Target | Commit | `npm ci` | unpacked Linux package |
|---|---|---|---|
| main | `6d089c2ab72d` | failure | skipped |
| 1068 | `b11af3bfbc75` | success | success |
| 1043 | `71194aa20e85` | success | success |

## Failure excerpts

### electron-linux main: install

```text
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@electron/osx-sign@2.0.0',
npm warn EBADENGINE   required: { node: '>=22.12.0' },
npm warn EBADENGINE   current: { node: 'v20.20.2', npm: '10.8.2' }
npm warn EBADENGINE }
npm error code EUSAGE
npm error
npm error `npm ci` can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync. Please update your lock file with `npm install` before continuing.
npm error
npm error Invalid: lock file's @smithy/protocol-http@5.2.1 does not satisfy @smithy/protocol-http@3.3.0
npm error Invalid: lock file's @smithy/signature-v4@5.2.1 does not satisfy @smithy/signature-v4@2.3.0
npm error Invalid: lock file's @smithy/util-utf8@4.1.0 does not satisfy @smithy/util-utf8@2.3.0
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/util-utf8@4.4.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/util-utf8@4.4.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/util-utf8@4.4.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/signature-v4@5.6.12 from lock file
npm error Missing: @smithy/util-utf8@4.4.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/util-utf8@4.4.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/util-utf8@4.4.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/types@2.12.0 from lock file
npm error Missing: @smithy/is-array-buffer@2.2.0 from lock file
npm error Missing: @smithy/types@2.12.0 from lock file
npm error Missing: @smithy/util-hex-encoding@2.2.0 from lock file
npm error Missing: @smithy/util-middleware@2.2.0 from lock file
npm error Missing: @smithy/util-uri-escape@2.2.0 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/util-utf8@4.4.16 from lock file
npm error Missing: @smithy/util-utf8@4.4.16 from lock file
npm error Missing: @smithy/util-buffer-from@2.2.0 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/signature-v4@5.6.12 from lock file
npm error Invalid: lock file's @smithy/core@3.12.0 does not satisfy @smithy/core@3.31.1
npm error Invalid: lock file's @smithy/types@4.5.0 does not satisfy @smithy/types@4.16.1
npm error Missing: @smithy/is-array-buffer@2.2.0 from lock file
npm error
npm error Clean install a project
npm error
npm error Usage:
npm error npm ci
npm error
npm error Options:
npm error [--install-strategy <hoisted|nested|shallow|linked>] [--legacy-bundling]
npm error [--global-style] [--omit <dev|optional|peer> [--omit <dev|optional|peer> ...]]
npm error [--include <prod|dev|optional|peer> [--include <prod|dev|optional|peer> ...]]
npm error [--strict-peer-deps] [--foreground-scripts] [--ignore-scripts] [--no-audit]
npm error [--no-bin-links] [--no-fund] [--dry-run]
npm error [-w|--workspace <workspace-name> [-w|--workspace <workspace-name> ...]]
npm error [-ws|--workspaces] [--include-workspace-root] [--install-links]
npm error
npm error aliases: clean-install, ic, install-clean, isntall-clean
npm error
npm error Run "npm help ci" for more info
npm error A complete log of this run can be found in: /home/runner/.npm/_logs/2026-07-31T19_27_37_420Z-debug-0.log
```

### web 1072: build

```text

> chatall@1.85.110 build
> vue-cli-service build

[baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
Browserslist: browsers data (caniuse-lite) is 10 months old. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
All browser targets in the browserslist configuration have supported ES module.
Therefore we don't build two separate bundles for differential loading.


-  Building for production...
[baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
Browserslist: browsers data (caniuse-lite) is 10 months old. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
[baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
Browserslist: browsers data (caniuse-lite) is 10 months old. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
[baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
Browserslist: browsers data (caniuse-lite) is 10 months old. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
[baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
[baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
Browserslist: browsers data (caniuse-lite) is 10 months old. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
Browserslist: browsers data (caniuse-lite) is 10 months old. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
 ERROR  Failed to compile with 1 error7:31:06 PM

 error  in ./src/bots/baidu/WenxinQianfanBot.js

Module not found: Error: Package path ./chat_models/baiduwenxin is not exported from package /home/runner/work/ChatALL/ChatALL/node_modules/@langchain/community (see exports field in /home/runner/work/ChatALL/ChatALL/node_modules/@langchain/community/package.json)

 ERROR  Error: Build failed with errors.
Error: Build failed with errors.
    at /home/runner/work/ChatALL/ChatALL/node_modules/@vue/cli-service/lib/commands/build/index.js:207:23
    at /home/runner/work/ChatALL/ChatALL/node_modules/webpack/lib/webpack.js:168:8
    at /home/runner/work/ChatALL/ChatALL/node_modules/webpack/lib/HookWebpackError.js:67:2
    at Hook.eval [as callAsync] (eval at create (/home/runner/work/ChatALL/ChatALL/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:6:1)
    at Hook.CALL_ASYNC_DELEGATE [as _callAsync] (/home/runner/work/ChatALL/ChatALL/node_modules/tapable/lib/Hook.js:18:14)
    at Cache.shutdown (/home/runner/work/ChatALL/ChatALL/node_modules/webpack/lib/Cache.js:154:23)
    at /home/runner/work/ChatALL/ChatALL/node_modules/webpack/lib/Compiler.js:1377:15
    at Hook.eval [as callAsync] (eval at create (/home/runner/work/ChatALL/ChatALL/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:6:1)
    at Hook.CALL_ASYNC_DELEGATE [as _callAsync] (/home/runner/work/ChatALL/ChatALL/node_modules/tapable/lib/Hook.js:18:14)
    at Compiler.close (/home/runner/work/ChatALL/ChatALL/node_modules/webpack/lib/Compiler.js:1370:23)
    at /home/runner/work/ChatALL/ChatALL/node_modules/webpack/lib/webpack.js:167:16
    at finalCallback (/home/runner/work/ChatALL/ChatALL/node_modules/webpack/lib/Compiler.js:498:32)
    at /home/runner/work/ChatALL/ChatALL/node_modules/webpack/lib/Compiler.js:522:13
    at Hook.eval [as callAsync] (eval at create (/home/runner/work/ChatALL/ChatALL/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:24:1)
    at Hook.CALL_ASYNC_DELEGATE [as _callAsync] (/home/runner/work/ChatALL/ChatALL/node_modules/tapable/lib/Hook.js:18:14)
    at onCompiled (/home/runner/work/ChatALL/ChatALL/node_modules/webpack/lib/Compiler.js:520:21)
    at /home/runner/work/ChatALL/ChatALL/node_modules/webpack/lib/Compiler.js:1348:17
    at Hook.eval [as callAsync] (eval at create (/home/runner/work/ChatALL/ChatALL/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:6:1)
    at Hook.CALL_ASYNC_DELEGATE [as _callAsync] (/home/runner/work/ChatALL/ChatALL/node_modules/tapable/lib/Hook.js:18:14)
    at /home/runner/work/ChatALL/ChatALL/node_modules/webpack/lib/Compiler.js:1344:33
    at finalCallback (/home/runner/work/ChatALL/ChatALL/node_modules/webpack/lib/Compilation.js:2925:11)
    at /home/runner/work/ChatALL/ChatALL/node_modules/webpack/lib/Compilation.js:3238:11
    at Hook.eval [as callAsync] (eval at create (/home/runner/work/ChatALL/ChatALL/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:6:1)
    at Hook.CALL_ASYNC_DELEGATE [as _callAsync] (/home/runner/work/ChatALL/ChatALL/node_modules/tapable/lib/Hook.js:18:14)
    at /home/runner/work/ChatALL/ChatALL/node_modules/webpack/lib/Compilation.js:3231:38
    at eval (eval at create (/home/runner/work/ChatALL/ChatALL/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:15:1)
    at eval (eval at create (/home/runner/work/ChatALL/ChatALL/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:14:1)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
```

### web main: install

```text
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@electron/osx-sign@2.0.0',
npm warn EBADENGINE   required: { node: '>=22.12.0' },
npm warn EBADENGINE   current: { node: 'v20.20.2', npm: '10.8.2' }
npm warn EBADENGINE }
npm error code EUSAGE
npm error
npm error `npm ci` can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync. Please update your lock file with `npm install` before continuing.
npm error
npm error Invalid: lock file's @smithy/protocol-http@5.2.1 does not satisfy @smithy/protocol-http@3.3.0
npm error Invalid: lock file's @smithy/signature-v4@5.2.1 does not satisfy @smithy/signature-v4@2.3.0
npm error Invalid: lock file's @smithy/util-utf8@4.1.0 does not satisfy @smithy/util-utf8@2.3.0
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/util-utf8@4.4.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/util-utf8@4.4.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/util-utf8@4.4.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/signature-v4@5.6.12 from lock file
npm error Missing: @smithy/util-utf8@4.4.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/util-utf8@4.4.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/util-utf8@4.4.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/types@2.12.0 from lock file
npm error Missing: @smithy/is-array-buffer@2.2.0 from lock file
npm error Missing: @smithy/types@2.12.0 from lock file
npm error Missing: @smithy/util-hex-encoding@2.2.0 from lock file
npm error Missing: @smithy/util-middleware@2.2.0 from lock file
npm error Missing: @smithy/util-uri-escape@2.2.0 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/util-utf8@4.4.16 from lock file
npm error Missing: @smithy/util-utf8@4.4.16 from lock file
npm error Missing: @smithy/util-buffer-from@2.2.0 from lock file
npm error Missing: @smithy/protocol-http@5.5.16 from lock file
npm error Missing: @smithy/signature-v4@5.6.12 from lock file
npm error Invalid: lock file's @smithy/core@3.12.0 does not satisfy @smithy/core@3.31.1
npm error Invalid: lock file's @smithy/types@4.5.0 does not satisfy @smithy/types@4.16.1
npm error Missing: @smithy/is-array-buffer@2.2.0 from lock file
npm error
npm error Clean install a project
npm error
npm error Usage:
npm error npm ci
npm error
npm error Options:
npm error [--install-strategy <hoisted|nested|shallow|linked>] [--legacy-bundling]
npm error [--global-style] [--omit <dev|optional|peer> [--omit <dev|optional|peer> ...]]
npm error [--include <prod|dev|optional|peer> [--include <prod|dev|optional|peer> ...]]
npm error [--strict-peer-deps] [--foreground-scripts] [--ignore-scripts] [--no-audit]
npm error [--no-bin-links] [--no-fund] [--dry-run]
npm error [-w|--workspace <workspace-name> [-w|--workspace <workspace-name> ...]]
npm error [-ws|--workspaces] [--include-workspace-root] [--install-links]
npm error
npm error aliases: clean-install, ic, install-clean, isntall-clean
npm error
npm error Run "npm help ci" for more info
npm error A complete log of this run can be found in: /home/runner/.npm/_logs/2026-07-31T19_27_36_033Z-debug-0.log
```

