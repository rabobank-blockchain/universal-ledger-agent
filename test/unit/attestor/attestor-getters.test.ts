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
import { Attestation, Attestor } from '../../../src'

const testData = {
  name: 'string',
  icon: 'string',
  pubKey: 'string',
  datetime: (new Date()).toISOString()
  // transactions?: Transaction[]
  // receivedAttestations?: Attestation[]
  // issuedAttestations?: Attestation[]
}

const testAttestation = new Attestation({
  uuid: '8a96f441-e856-4cde-aebe-49d812016f8c',
  attestorPubKey: '0x41507f9034E043545CdAcD89c32cf3b6484172A7',
  forPubKey: '0x38e9ED09c48a435274F27794bf5Ee895DaAb22F0',
  context: ['https://schema.org'],
  type: ['typeOfMessage'],
  // expires?: number // timestamp, optional
  datetime: new Date(),
  statements: {
    'https://schema.org/familyName': 'Janssen'
  } as any
})

describe('Attestor getters', function () {
  const sut = new Attestor(testData)

  it('should return an unchanged name', () => {
    assert.strictEqual(sut.name, testData.name)
  })

  it('should return an unchanged icon', () => {
    assert.strictEqual(sut.icon, testData.icon)
  })

  it('should return an unchanged pubKey', () => {
    assert.strictEqual(sut.pubKey, testData.pubKey)
  })

  it('should return an unchanged dateTime', () => {
    assert.strictEqual(sut.datetime.toISOString(), testData.datetime)
  })

  it('should flatten an object using JSON.stringify()', () => {
    assert.strictEqual(JSON.stringify(sut), `{"name":"string","icon":"string","pubKey":"string","datetime":"${sut.datetime.toISOString()}"}`)
  })
})


describe('Attestor setters', function () {
  it('should set new transactions', () => {
    const sut1 = new Attestor(Object.assign({}, testData))

    sut1.transactions = []

    assert.deepEqual([], sut1.transactions)
  })

  it('should set new issuedAttestations', () => {
    const sut1 = new Attestor(Object.assign({}, testData))

    sut1.issuedAttestations = [testAttestation]

    assert.deepEqual([testAttestation], sut1.issuedAttestations)
  })

  it('should set new receivedAttestations', () => {
    const sut1 = new Attestor(Object.assign({}, testData))

    sut1.receivedAttestations = [testAttestation]

    assert.deepEqual([testAttestation], sut1.receivedAttestations)
  })
})
