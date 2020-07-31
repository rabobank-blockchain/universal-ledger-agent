# Integration

the ULA and plugins can be used to help implement an issuer, verifier and/or an holder. This document describes with examples how to integrate the ULA and plugin in an example app (the holder).

## Example implementation of the holder app

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
npm install ula-process-eth-barcode --save
npm install ula-vp-controller --save
npm install ula-vc-data-management --save
```

### Instantiating the ULA

Now that we have a clear view of all the elements and their responsibilities, let's start instantiating them so we can configure the ULA. We will do this from bottom to top:

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

The signers will be used in their respective *generators*. The generators are used to create valid Verifiable Credentials and Verifiable Presentations. The holder will not create a Challenge Request, but must be able to verify the object and signature. Therefore we will not use a generator for `ChallengeRequest`.

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

A storage definition is needed. The [interface](https://github.com/rabobank-blockchain/ula-vc-data-management/blob/master/src/interface/data-storage.ts#L27) is compatible with `@ionic/storage` in case you happen to be using Ionic.
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
  processQrCodePlugin
]

const eventHandler = new EventHandler(plugins)
```

You can now start using the ULA by sending messages to it.

### Using the ULA

One or more ULA plugins can be triggered by calling the function `eventHandler.processMsg()`. This function takes 2 parameters: 

1. `jsonObject `: Contains a `type` field (a string) and other arbitrary content. Each plugin decides if the message is useful or not - based on the `type`. The plugin will use the payload to perform its functionality. 
2. `callback`: If the plugin returns data, this can be done via a callback function. The callback data will be in the form of a [UlaResponse](../src/model/ula-response.ts).

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

#### plugin ula-process-eth-barcode

All plugins will listen to the messages that are sent to the eventHandler. Messages of the type 'ethereum-qr' are picked by the plugin [ula-process-eth-barcode](https://github.com/rabobank-blockchain/ula-process-eth-barcode#ula-process-eth-barcode).
The purpose of this plugin is to provide a way to retrieve a ChallengeRequest.

If the message is correctly formatted, it should contain an url-endpoint like described in the example above.
The url-endpoint should return a ChallengeRequest.
This ChallengeRequest - as well as the callback function is then forwarded to the next plugin by sending a ULA message with type 'process-challengerequest'.

#### plugin ula-vp-controller

Messages with the type 'process-challengerequest' are picked up by the [ula-vp-controller](https://github.com/rabobank-blockchain/ula-vp-controller#ula-vp-controller-plugin) plugin.
This plugin contains a lot of functionality. Its main purpose is to handle the exchange of credentials.
This can either be receiving credentials from an issuer or sending credentials to a verifier using the W3C Verifiable Credential standard.
For more details of the used models in the exchange process see [vp-toolkit-models](https://github.com/rabobank-blockchain/vp-toolkit-models#vp-toolkit-models).

The `ula-vp-controller` will return [callbacks](https://github.com/rabobank-blockchain/ula-vp-controller#callbacks) for succes or failure.
It will also ask for consent before sharing credentials.
Please note that those callbacks are the callbacks that were instantiated by the first called plugin, the `ula-process-eth-barcode`.

#### plugin ula-vc-data-management

The plugin [ula-vc-data-management](https://github.com/rabobank-blockchain/ula-vc-data-management#ula-vc-data-management) acts as a repository and responds to various message types.
For a complete list of supported types, see [here](https://github.com/rabobank-blockchain/ula-vc-data-management#usage).
This plugin is used by the `ula-vp-controller` plugin, but you can also use it directly in the holder-app, to display and manage credentials that are present in the storage. 

For example, we can list all stored attestations, per attestor (issuer):

```typescript
import { Message, Attestor } from 'universal-ledger-agent'

const getAttestorsMsg = new Message({
  type: 'get-attestors'
})

eventHandler.processMsg(getAttestorsMsg, (response: any) => {
  response.body.forEach( (attestor: Attestor) => {
    console.log('Attestor:', attestor.name)
    console.log('Public key:', attestor.pubKey)
    console.log('Attestations:', attestor.issuedAttestations)
  })
})
```

The message structure and the returned items are according to a minimal but generic data-model that is defined in the [universal-ledger-agent](https://github.com/rabobank-blockchain/universal-ledger-agent#messaging). The `ula-vc-data-management` plugin only stores W3C Verifiable Credentials, but you can also create another data plugin that would store other type of attestations in another format. As long as your data format can be translated to the generic data-model, it will allow for a shared usage of different types of attestors, attestations and transactions.
