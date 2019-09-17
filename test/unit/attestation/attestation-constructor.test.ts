/*
 * Copyright 2019 Coöperatieve Rabobank U.A.
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

describe('Attestation constructor', function () {
  it('should not accept empty attestorPubKey field', () => {
    let prep = Object.assign({}, testAttestation)
    prep.attestorPubKey = ''
    const createSut = () => {
      return new Attestation(prep)
    }

    assert.throws(createSut, ReferenceError, 'One or more fields are empty')
  })

  it('should not accept empty context field', () => {
    let prep = Object.assign({}, testAttestation)
    prep.context = []

    const createSut = () => {
      return new Attestation(prep)
    }

    assert.throws(createSut, ReferenceError, 'One or more fields are empty')
  })

  it('should not accept empty type field', () => {
    let prep = Object.assign({}, testAttestation)
    prep.type = []

    const createSut = () => {
      return new Attestation(prep)
    }

    assert.throws(createSut, ReferenceError, 'One or more fields are empty')
  })

  it('should not accept undefined statements field', () => {
    let prep = Object.assign({}, testAttestation)
    prep.statements = undefined

    const createSut = () => {
      return new Attestation(prep)
    }

    assert.throws(createSut, ReferenceError, 'One or more fields are empty')
  })

  it('should not accept empty statements field', () => {
    let prep = Object.assign({}, testAttestation)
    prep.statements = []

    const createSut = () => {
      return new Attestation(prep)
    }

    assert.throws(createSut, ReferenceError, 'One or more fields are empty')
  })

  it('should not throw on valid inputs', () => {
    let prep = Object.assign({}, testAttestation)

    const createSut = () => {
      return new Attestation(prep)
    }

    createSut()
    assert.doesNotThrow(createSut)
  })

  it('should convert a JSON object to a Proof class', () => {
    const sut1 = new Attestation(testAttestation)
    const jsonObj = JSON.parse(JSON.stringify(sut1))
    let sut2 = new Attestation(jsonObj)
    assert.deepEqual(sut1, sut2)
  })

  it('should allow for the attestor-id to have not been created', () => {
    let prep = Object.assign({}, testAttestation)
    delete prep.uuid

    const createSut = () => {
      return new Attestation(prep)
    }

    createSut()
    assert.doesNotThrow(createSut)
  })

})
