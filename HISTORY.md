# 0.2.0 / 27-07-2020

**BREAKING**
- The callback function signature is now strictly typed instead of `any`. Application developers are required to follow this signature ([#12](https://github.com/rabobank-blockchain/universal-ledger-agent/issues/12))
- The `UlaResponse.statusCode` now has type `any` instead of `number`. We recommend you to use self explanatory strings.
- The return signature of `EventHandler.processMsg()` changed from `Promise<void>[]` to `Promise<PluginResult>[]` to get a clear list of the exit statuscodes for each plugin after full completion ([#13](https://github.com/rabobank-blockchain/universal-ledger-agent/issues/13))
- If your plugin raises an error, please use the new `UlaError` type: `throw new UlaError('error-xyz', 'Something went wrong!')` ([#8](https://github.com/rabobank-blockchain/universal-ledger-agent/issues/8))

**New features**
- Introduced `GenericStatusCode` enum for developers to use consistent status codes in a few scenario's (`success` for happy flow and `ignored` if the message isn't interpreted by your plugin)
-`UlaResponse` has an extra optional field `error` for better error handling

**Deprecations**
- `HttpHandler` class is now deprecated and will be removed in a future major release ([#11](https://github.com/rabobank-blockchain/universal-ledger-agent/issues/11))
- `Message` class is now deprecated and will be renamed to `UlaMessage` to give more clarity

**Enhancements**
- Renamed `ulaMessage.ts` to `ula-message.ts` for consistency
- Refactored HttpService and HttpHandler tests
- Stryker score back to 100 (stable)
- Improved documentation
- Dependency upgrades:
  - class-transformer: 0.2.3 to 0.3.1
  - uuid: 3.3.3 to 3.4.0
- DevDependency upgrades:
  - @stryker-mutator/core: 2.4.0 to 2.5.0
  - @stryker-mutator/html-reporter: 2.4.0 to 2.5.0
  - @stryker-mutator/mocha-runner: 2.4.0 to 2.5.0
  - @stryker-mutator/typescript: 2.4.0 to 2.5.0
  - @types/chai: 4.2.7 to 4.2.12
  - @types/chai-as-promised: 7.1.2 to 7.1.3
  - @types/sinon: 7.5.1 to 7.5.2
  - @types/sinon-chai: 3.2.3 to 3.2.4
  - @types/uuid: 3.4.6 to 3.4.9
  - fetch-mock: 8.3.1 to 8.3.2
  - mocha: 7.0.0 to 7.2.0
  - nyc: 15.0.0 to 15.1.0
  - sinon: 8.0.4 to 8.1.1
  - sinon-chai: 3.4.0 to 3.5.0
  - source-map-support: 0.5.16 to 0.5.19
  - ts-node: 8.5.4 to 8.10.2
  - typescript: 3.4.5 to 3.9.7

# 0.1.3 / 23-03-2020

**Enhancements:**
- Downgraded TypeScript to v3.4.5 to provide proper `d.ts` files (v3.7 breaks this)

# 0.1.2 / 08-01-2020

**Enhancements:**
- Updated all dependencies, fixed [CVE-2019-19919](https://github.com/advisories/GHSA-w457-6q6x-cgp9)
- Introduced [HISTORY.md](HISTORY.md)

#0.1.1 / 17-09-2019

*Initial release*
