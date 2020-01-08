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
import { Attestation, Attestor, Transaction } from '../../../src'
import { testAttestation, testAttestor, testTransaction } from '../test-helper'

describe('Attestor constructor', function () {
  it('should not accept empty name field', () => {
    let prep = Object.assign({}, testAttestor)
    prep.name = ''

    const createSut = () => {
      return new Attestor(prep)
    }

    assert.throws(createSut, ReferenceError, 'One or more fields are empty')
  })

  it('should not accept empty icon field', () => {
    let prep = Object.assign({}, testAttestor)
    prep.icon = ''

    const createSut = () => {
      return new Attestor(prep)
    }

    assert.throws(createSut, ReferenceError, 'One or more fields are empty')
  })

  it('should not accept empty pubKey field', () => {
    let prep = Object.assign({}, testAttestor)
    prep.pubKey = ''

    const createSut = () => {
      return new Attestor(prep)
    }

    assert.throws(createSut, ReferenceError, 'One or more fields are empty')
  })

  it('should not accept empty datetime field', () => {
    let prep = Object.assign({}, testAttestor)
    prep.datetime = ''

    const createSut = () => {
      return new Attestor(prep)
    }

    assert.throws(createSut, ReferenceError, 'One or more fields are empty')
  })

  it('should not throw on valid inputs with no optionals', () => {
    let prep = Object.assign({}, testAttestor)
    prep.transactions = undefined
    prep.issuedAttestations = undefined
    prep.receivedAttestations = undefined

    const createSut = () => {
      return new Attestor(prep)
    }

    createSut()
    assert.doesNotThrow(createSut)
  })

  it('should not throw on valid inputs with optionals', () => {
    let prep = Object.assign({}, testAttestor)

    const createSut = () => {
      return new Attestor(prep)
    }

    createSut()
    assert.doesNotThrow(createSut)
  })

  it('should accept Transaction objects', () => {
    const sut = new Attestor(testAttestor)
    const attestorTransactions = sut.transactions as Transaction[]
    assert.notEqual(attestorTransactions[0], testTransaction) // Not the same object reference
    assert.deepEqual(sut.transactions, testAttestor.transactions) // But still the same fields
  })

  it('should convert a JSON object to a Attestor class', () => {
    const sut1 = new Attestor(Object.assign({}, testAttestor))
    sut1.receivedAttestations = [new Attestation(testAttestation)]
    sut1.issuedAttestations = [new Attestation(testAttestation)]

    const jsonObj = JSON.parse(JSON.stringify(sut1))
    let sut2 = new Attestor(jsonObj)
    assert.deepEqual(sut1, sut2)
  })

})
