# Integration

the ULA and plugins can be used to help implement an issuer, verifier and/or an holder. This document describes with examples how to integrate the ULA and plugin in an example app (the holder).

## Component usage

Currently the following components are provided. Some components can be used for the issuer and verifier, while others are more suited to use in the holder. The table below gives an overview where each component currently is used: 

Component | Used in Issuer | Used in Holder | Used in Verifier
:--- | :---: | :---: | :---: |
`universal-ledger-agent` | √ | √ | √ | 
`ula-vc-data-management` | - | √ | - |
`ula-process-barcode` | - | √ | - |
`ula-vp-controller` | - | √ | - |
`vp-toolkit` | √ | √ | √ | √ | 
`vp-toolkit-models` | √ | √ | √ |
`vc-status-registry` | √ | - | √ |
`crypt-utils` | √ | √ | √ |

The components starting with `ula-` are ula-plugins that can be plugged in to the `universal-ledger-agent`. 

The components `vp-toolkit`, `vp-toolkit-models`, `vc-status-registry` and `crypt-utils` are used to setup the ula-plugins. They can also be used standalone.

## Example implementation of the holder

The end-goal is to enrich your application's interoperability by adding the `universal-ledger-agent`, configured with a set of components that we want to use.

### Understanding the components
 We are going to use the following ULA plugins:

* [ula-vc-data-management](https://github.com/rabobank-blockchain/ula-vc-data-management#ula-vc-data-management): Storing and retrieving Verifiable Credentials.
* [ula-process-eth-barcode](https://github.com/rabobank-blockchain/ula-process-eth-barcode#ula-process-eth-barcode): Digests an Ethereum QR code payload to kick off the credential exchange process.
* [ula-vp-controller](https://github.com/rabobank-blockchain/ula-vp-controller#ula-vp-controller-plugin): Responds to a challenge request, coming from the `ula-process-eth-barcode` plugin, to control the entire credential exchange process.

The plugins at their turn are configured with elements from:

 * [crypt-util](https://github.com/rabobank-blockchain/crypt-util#crypt-util): A class for managing cryptographic (derivable) keys.
    * [LocalCryptUtils](https://github.com/rabobank-blockchain/crypt-util/blob/master/src/local-crypt-utils.ts#L24): An implementation of the interface [CryptUtil](https://github.com/rabobank-blockchain/crypt-util/blob/master/src/interface/crypt-util.ts#L17) The keys and addresses can be used with Ethereum-like blockchains. In this implementation the keys will be stored locally on the device.
 * [vp-toolkit](https://github.com/rabobank-blockchain/vp-toolkit#vp-toolkit): A toolkit for managing Verifiable Credentials and Verifiable Presentations
     * [ChallengeRequestSigner](https://github.com/rabobank-blockchain/vp-toolkit/blob/master/src/service/signers/challenge-request-signer.ts#L21): Signs a [Challenge Request](https://github.com/rabobank-blockchain/vp-toolkit-models/blob/master/src/model/challenge-request.ts#L41)
     * [VerifiableCredentialGenerator](https://github.com/rabobank-blockchain/vp-toolkit/blob/master/src/service/generators/verifiable-credential-generator.ts#L21): Generates a [Verifiable Credential](https://github.com/rabobank-blockchain/vp-toolkit-models/blob/master/src/model/verifiable-credential.ts#L33)
     * [VerifiableCredentialSigner](https://github.com/rabobank-blockchain/vp-toolkit/blob/master/src/service/signers/verifiable-credential-signer.ts#L21): Signs a [Verifiable Credential](https://github.com/rabobank-blockchain/vp-toolkit-models/blob/master/src/model/verifiable-credential.ts#L33)
     * [VerifiablePresentationGenerator](https://github.com/rabobank-blockchain/vp-toolkit/blob/master/src/service/generators/verifiable-presentation-generator.ts#L21): Generates a [Verifiable Presentation](https://github.com/rabobank-blockchain/vp-toolkit-models/blob/master/src/model/verifiable-presentation.ts#L30)
     * [VerifiablePresentationSigner](https://github.com/rabobank-blockchain/vp-toolkit/blob/master/src/service/signers/verifiable-presentation-signer.ts#L23): Signs a [Verifiable Presentation](https://github.com/rabobank-blockchain/vp-toolkit-models/blob/master/src/model/verifiable-presentation.ts#L30)

### Installing the components

```bash
npm install universal-ledger-agent --save
npm install vp-toolkit --save
npm install crypt-util --save
npm install ula-process-barcode --save
npm install ula-vp-controller --save
npm install ula-vc-data-management --save
```

### Implement

Now that we have a clear view of all the elements and their responsibilities, let's start instatiating them so we can configure the ULA. We will do this from bottom to top:

1) Instantiate dependencies
2) Instantiate plugins with their dependencies
3) Instantiate universal ledger agent with plugins

First we configure a `cryptUtil` object and initialise it with a private key:

```typescript
import { LocalCryptUtils } from 'crypt-util'

const privateMasterKey = 'xprv9s21ZrQH143K4Hahxy3chUqrrHbCynU5CcnRg9xijCvCG4f3AJb1PgiaXpjik6pDnT1qRmf3V3rzn26UNMWDjfEpUKL4ouy6t5ZVa4GAJVG'
const cryptUtil = new LocalCryptUtils()
cryptUtil.importMasterPrivateKey(privateMasterKey)
```

The `cryptUtil` functionality will be used by several *signers*; A `ChallengeRequest` signer, a `VerifiableCredential` signer and a `VerifiablePresentation` signer. The signers can be used for both signing and verifying.

```typescript
import {
  ChallengeRequestSigner,
  VerifiableCredentialSigner,
  VerifiablePresentationSigner
} from 'vp-toolkit'

const crSigner = new ChallengeRequestSigner(cryptUtil)
const vcSigner = new VerifiableCredentialSigner(cryptUtil)
const vpSigner = new VerifiablePresentationSigner(cryptUtil, vcSigner)
```

The signers will be used in their respective *generators*. The generators are used to create valid Verifiable Credentials and Verifiable Presentations. The holder will not create a Challenge Request (CR), but must be able to verify the object and signature. Therefore we will not use a generator for `ChallengeRequest`.

```typescript
import {
  VerifiableCredentialGenerator,
  VerifiablePresentationGenerator,
} from 'vp-toolkit'

const vcGenerator = new VerifiableCredentialGenerator(vcSigner)
const vpGenerator = new VerifiablePresentationGenerator(vpSigner)
```

A browser service is needed in order to communicate with the issuer / verifier using HTTP.

```typescript
import { BrowserHttpService } from 'universal-ledger-agent'

const browserHttpService = new BrowserHttpService()
```

Construct these logic helpers for the `ula-vp-controller`:

```typescript
import { AddressHelper, VerifiableCredentialHelper } from 'ula-vp-controller'

const addressHelper = new AddressHelper(cryptUtil)
const verifiableCredentialHelper = new VerifiableCredentialHelper(vcGenerator, addressHelper)
```

The **ULA VP Controller plugin** can now be implemented as follows:
 
```typescript
import { VpController } from 'ula-vp-controller'

// The accountId can be seen as a 'profile ID',
// if your app supports multiple profiles.
const accountId = 0

const vpControllerPlugin = new VpController(
  vpGenerator,
  [vpSigner],
  [crSigner],
  browserHttpService,
  verifiableCredentialHelper,
  addressHelper,
  accountId)
```

A storage definition is needed. The [interface](https://github.com/rabobank-blockchain/ula-vc-data-management/blob/master/src/interface/data-storage.ts#L27) is compatible with `@ionic/storage`.
For illlustration purposes a simple in-memory implementation is defined below:

```typescript
import { DataStorage } from 'ula-vc-data-management'

class Storage implements DataStorage {
  private keys = {}
  set = (key, value) => Promise.resolve(this.keys[key] = value)
  get = (key) => Promise.resolve(this.keys[key])
  remove = (key) => Promise.resolve(this.keys[key] = undefined)
}

const storage = new Storage()
```

The **ULA data management plugin** can now be instantiated as follows:

```typescript
import {
  AddressRepository,
  VcDataManagement,
  VerifiableCredentialRepository,
  VerifiableCredentialTransactionRepository
} from 'ula-vc-data-management'

const vcDataRepository = new VerifiableCredentialRepository(storage)
const addressRepository = new AddressRepository(storage)
const vcTxRepository = new VerifiableCredentialTransactionRepository(storage)

const vcDataMgmtPlugin = new VcDataManagement(vcDataRepository, addressRepository, vcTxRepository)
```

The **ULA process QrCode plugin** is the last plugin that we construct: 

```typescript
const processQrCodePlugin = new ProcessEthBarcode(browserHttpService)
```

Finally we can construct the ULA framework (`EventHandler`). This object will broadcast ULA messages to all `plugins`:

```typescript
import { EventHandler } from 'universal-ledger-agent'

const plugins = [
  vcDataMgmtPlugin,
  vpControllerPlugin,
  processQrcodePlugin
]

const eventHandler = new EventHandler(plugins)
```

To kick off the process, scan a QR code and process the payload in your application. Feed the payload like this:
```typescript
import { UlaResponse } from 'universal-ledger-agent'

const qrCodeContents: object = await yourQRCodeScanner.scan()

// The QR code payload will be a parsed object, looking like this:
// { type: 'ethereum-qr', url: 'https://issuer.com/ssi/session/uuid-here'}

eventHandler.processMsg(qrCodeContents, (response: UlaResponse) => {
	console.log('statuscode:', response.statusCode)
	console.log('body:', response.body)
})
```
