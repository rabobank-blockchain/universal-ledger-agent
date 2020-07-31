# Community plugins

**!!** *Always check the code and licenses when using third-party code in your identity application* **!!**

Link | Description
:--- | :--- |
[https://github.com/ula-aca](https://github.com/ula-aca) | Hyperledger Aries plugins for issuer, holder and verifier

Add your plugins to the list by opening a PR.

# Official plugins

Component | Used in Issuer | Used in Holder | Used in Verifier
:--- | :---: | :---: | :---: |
`ula-vc-data-management` | - | √ | - |
`ula-process-eth-barcode` | - | √ | - |
`ula-vp-controller` | - | √ | - |

* [ula-vc-data-management](https://github.com/rabobank-blockchain/ula-vc-data-management#ula-vc-data-management): Storing and retrieving Verifiable Credentials.
* [ula-process-eth-barcode](https://github.com/rabobank-blockchain/ula-process-eth-barcode#ula-process-eth-barcode): Digests an Ethereum QR code payload to kick off the credential exchange process.
* [ula-vp-controller](https://github.com/rabobank-blockchain/ula-vp-controller#ula-vp-controller-plugin): Responds to a challenge request, coming from the `ula-process-eth-barcode` plugin, to control the entire credential exchange process.

Components starting with `ula-` are ula-plugins that can be plugged in to the `universal-ledger-agent`. 

# Core components

Currently the following components are provided. Some components can be used for the issuer and verifier, while others are more suited to use in the holder. All of these components can be used standalone (without ULA) The table below gives an overview where each component currently is used: 

Component | Used in Issuer | Used in Holder | Used in Verifier
:--- | :---: | :---: | :---: |
`universal-ledger-agent` | √ | √ | √ | 
`vp-toolkit` | √ | √ | √ | √ | 
`vp-toolkit-models` | √ | √ | √ |
`vc-status-registry` | √ | - | √ |
`crypt-utils` | √ | √ | √ |

## Understanding the core components

 * [crypt-util](https://github.com/rabobank-blockchain/crypt-util#crypt-util): A class for managing cryptographic (derivable) keys.
    * [LocalCryptUtils](https://github.com/rabobank-blockchain/crypt-util/blob/master/src/local-crypt-utils.ts#L24): An implementation of the interface [CryptUtil](https://github.com/rabobank-blockchain/crypt-util/blob/master/src/interface/crypt-util.ts#L17) The keys and addresses can be used with Ethereum-like blockchains. In this implementation the keys will be stored locally on the device.
 * [vp-toolkit](https://github.com/rabobank-blockchain/vp-toolkit#vp-toolkit): A toolkit for managing Verifiable Credentials and Verifiable Presentations
     * [ChallengeRequestSigner](https://github.com/rabobank-blockchain/vp-toolkit/blob/master/src/service/signers/challenge-request-signer.ts#L21): Signs a [Challenge Request](https://github.com/rabobank-blockchain/vp-toolkit-models/blob/master/src/model/challenge-request.ts#L41)
     * [VerifiableCredentialGenerator](https://github.com/rabobank-blockchain/vp-toolkit/blob/master/src/service/generators/verifiable-credential-generator.ts#L21): Generates a [Verifiable Credential](https://github.com/rabobank-blockchain/vp-toolkit-models/blob/master/src/model/verifiable-credential.ts#L33)
     * [VerifiableCredentialSigner](https://github.com/rabobank-blockchain/vp-toolkit/blob/master/src/service/signers/verifiable-credential-signer.ts#L21): Signs a [Verifiable Credential](https://github.com/rabobank-blockchain/vp-toolkit-models/blob/master/src/model/verifiable-credential.ts#L33)
     * [VerifiablePresentationGenerator](https://github.com/rabobank-blockchain/vp-toolkit/blob/master/src/service/generators/verifiable-presentation-generator.ts#L21): Generates a [Verifiable Presentation](https://github.com/rabobank-blockchain/vp-toolkit-models/blob/master/src/model/verifiable-presentation.ts#L30)
     * [VerifiablePresentationSigner](https://github.com/rabobank-blockchain/vp-toolkit/blob/master/src/service/signers/verifiable-presentation-signer.ts#L23): Signs a [Verifiable Presentation](https://github.com/rabobank-blockchain/vp-toolkit-models/blob/master/src/model/verifiable-presentation.ts#L30)
