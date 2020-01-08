/*
 * Copyright 2020 Coöperatieve Rabobank U.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { assert } from 'chai'
import { Attestation } from '../../../src'
import { testAttestation } from '../test-helper'

describe('Attestation getters', function () {
  const sut = new Attestation(testAttestation)

  it('should return an unchanged id', () => {
    assert.strictEqual(sut.uuid, testAttestation.uuid)
  })

  it('should return an unchanged type', () => {
    assert.strictEqual(sut.attestorPubKey, testAttestation.attestorPubKey)
  })

  it('should return an unchanged expired field', () => {
    const testAttestationWithExpiresField = Object.assign({}, testAttestation)
    testAttestationWithExpiresField.expires = new Date('01-01-2019 12:34')
    const attestationSut = new Attestation(testAttestationWithExpiresField)

    const sutExpiresValue = attestationSut.expires as Date
    assert.strictEqual(sutExpiresValue.toISOString(), testAttestationWithExpiresField.expires.toISOString())
  })

  it('should flatten an object using JSON.stringify()', () => {
    assert.strictEqual(JSON.stringify(sut), `{"uuid":"8a96f441-e856-4cde-aebe-49d812016f8c","attestorPubKey":"0x41507f9034E043545CdAcD89c32cf3b6484172A7","forPubKey":"0x38e9ED09c48a435274F27794bf5Ee895DaAb22F0","context":["https://schema.org"],"type":["typeOfMessage"],"datetime":"${sut.datetime.toISOString()}","statements":{"https://schema.org/familyName":"Janssen"}}`)
  })
})
