# universal-ledger-agent

[![Build Status](https://travis-ci.org/rabobank-blockchain/universal-ledger-agent.svg?branch=master)](https://travis-ci.org/rabobank-blockchain/universal-ledger-agent)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1a74f181aa5d034637b8/test_coverage)](https://codeclimate.com/github/rabobank-blockchain/universal-ledger-agent/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/1a74f181aa5d034637b8/maintainability)](https://codeclimate.com/github/rabobank-blockchain/universal-ledger-agent/maintainability)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This repository contains the Universal Ledger Agent, a TypeScript/Javascript library that acts as the main component of a plugin system that implements a message-based approach. The library can be used in browsers and Node.js backends.

## Installation

In an existing project (with `package.json`), install `universal-ledger-agent`

```bash
npm install universal-ledger-agent --save
```

## Usage



### Mobile app

In order to implement all [official ULA plugins](docs/plugins-list.md) for the Holder in your mobile app, follow these steps:

Run these commands in your project:
```bash
npm install universal-ledger-agent --save
npm install vp-toolkit --save
npm install crypt-util --save
npm install ula-process-eth-barcode --save
npm install ula-vp-controller --save
npm install ula-vc-data-management --save
```

Introduce this code to initialize the ULA with all plugins:
```typescript
import { LocalCryptUtils } from 'crypt-util'
import { VpController } from 'ula-vp-controller'
import { VcDataManagement } from 'ula-vc-data-management'
import { ProcessEthBarcode } from 'ula-process-eth-barcode'
import { EventHandler, UlaResponse } from 'universal-ledger-agent'

// Make sure to generate 
const privateMasterKey = 'xprv9s21ZrQH143K4Hahxy3chUqrrHbCynU5CcnRg9xijCvCG4f3AJb1PgiaXpjik6pDnT1qRmf3V3rzn26UNMWDjfEpUKL4ouy6t5ZVa4GAJVG'
const cryptUtil = new LocalCryptUtils()
cryptUtil.importMasterPrivateKey(privateMasterKey)

// Plugins
const processQrCodePlugin = new ProcessEthBarcode()
const vpControllerPlugin = new VpController(cryptUtil)
const vcDataMgmtPlugin = new VcDataManagement()

const plugins = [
  vcDataMgmtPlugin,
  vpControllerPlugin,
  processQrCodePlugin
]

// ULA
const eventHandler = new EventHandler(plugins)

// Call the ULA
function callUla(payload: any) {
eventHandler.processMsg(payload, (response: UlaResponse) => {
	console.log('statuscode:', response.statusCode)
	console.log('body:', response.body)
})
}
```

### Catching errors
If one plugin throws an Error, other plugins will still continue executing their workflow.
The callback function will be triggered in case of a plugin error. Application developers must listen to these errors (example below).
We advise ULA plugin developers to provide a clear list of all Error codes and their descriptions for the application developers.

```typescript
const callback = function(response: UlaResponse) {
	// Note that it's theoretically possible that multiple errors can occur!
	console.log('statuscode:', response.statusCode) // 'error-cr'
	console.log('body:', response.body) // {}
	console.log('body:', response.error) // Error('The ChallengeRequest validation failed: Invalid signature')
	// Inform your user that the connection setup with the third party failed
}

eventHandler.processMsg(message, callback)
```

## Create your own ULA plugins
Please read [creating-plugins.md](docs/creating-plugins.md)

## Running tests

Besides unit testing with Mocha, the effectivity of all tests are also measured with the Stryker mutation testing framework.

```bash
npm run test
npm run stryker
```

We aim to achieve a coverage of 100%. Stryker and/or mocha test scores below 80% will fail the build.

## Credits

The ULA architecture has been designed in collaboration with Workday, Inc.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License and disclaimer

[apache-2.0](https://choosealicense.com/licenses/apache-2.0/) with a [notice](NOTICE).

We discourage the use of this work in production environments as it is in active development and not mature enough.
