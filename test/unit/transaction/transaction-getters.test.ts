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
import { Transaction, Attestation } from '../../../src'

const attestationData = new Attestation({
  uuid: '8a96f441-e856-4cde-aebe-49d812016f8c',
  attestorPubKey: '0x41507f9034E043545CdAcD89c32cf3b6484172A7',
  forPubKey: '0x38e9ED09c48a435274F27794bf5Ee895DaAb22F0',
  context: ['https://schema.org'],
  type: ['typeOfMessage'],
  // expires?: number // timestamp, optional
  datetime: new Date(),
  statements: {
    'https://schema.org/familyName': 'Janssen'
  }
})

const testData = {
  uuid: '800aa58d-afdb-49eb-a5a2-fa4648d58b29',
  attestorPubKey: '0xfbe1505b99A1548523eCbf78699B08e4580624F9',
  datetime: new Date().toISOString(),
  attest: [attestationData],
  revoke: [attestationData],
  verifyRequest: [attestationData],
  state: 'string',
  error: 'string'
}

describe('Transaction getters', function () {
  const sut = new Transaction(testData)

  it('should return an unchanged uuid', () => {
    assert.strictEqual(sut.uuid, testData.uuid)
  })

  it('should return an unchanged attestorPubKey', () => {
    assert.strictEqual(sut.attestorPubKey, testData.attestorPubKey)
  })

  it('should return an unchanged datetime', () => {
    assert.strictEqual(sut.datetime.toISOString(), testData.datetime)
  })

  it('should return an unchanged attest', () => {
    assert.deepEqual(sut.attest, testData.attest)
  })

  it('should return an unchanged revoke', () => {
    assert.deepEqual(sut.revoke, testData.revoke)
  })

  it('should return an unchanged verifyRequest', () => {
    assert.deepEqual(sut.verifyRequest, testData.verifyRequest)
  })

  it('should return an unchanged state', () => {
    assert.strictEqual(sut.state, testData.state)
  })

  it('should return an unchanged error', () => {
    assert.strictEqual(sut.error, testData.error)
  })

  it('should flatten an object using JSON.stringify()', () => {
    assert.strictEqual(JSON.stringify(sut), `{"uuid":"800aa58d-afdb-49eb-a5a2-fa4648d58b29","attestorPubKey":"0xfbe1505b99A1548523eCbf78699B08e4580624F9","datetime":"${sut.datetime.toISOString()}","attest":[{"uuid":"8a96f441-e856-4cde-aebe-49d812016f8c","attestorPubKey":"0x41507f9034E043545CdAcD89c32cf3b6484172A7","forPubKey":"0x38e9ED09c48a435274F27794bf5Ee895DaAb22F0","context":["https://schema.org"],"type":["typeOfMessage"],"datetime":"${sut.attest[0].datetime.toISOString()}","statements":{"https://schema.org/familyName":"Janssen"}}],"revoke":[{"uuid":"8a96f441-e856-4cde-aebe-49d812016f8c","attestorPubKey":"0x41507f9034E043545CdAcD89c32cf3b6484172A7","forPubKey":"0x38e9ED09c48a435274F27794bf5Ee895DaAb22F0","context":["https://schema.org"],"type":["typeOfMessage"],"datetime":"${sut.revoke[0].datetime.toISOString()}","statements":{"https://schema.org/familyName":"Janssen"}}],"verifyRequest":[{"uuid":"8a96f441-e856-4cde-aebe-49d812016f8c","attestorPubKey":"0x41507f9034E043545CdAcD89c32cf3b6484172A7","forPubKey":"0x38e9ED09c48a435274F27794bf5Ee895DaAb22F0","context":["https://schema.org"],"type":["typeOfMessage"],"datetime":"${sut.verifyRequest[0].datetime.toISOString()}","statements":{"https://schema.org/familyName":"Janssen"}}],"state":"string","error":"string"}`)
  })
})
