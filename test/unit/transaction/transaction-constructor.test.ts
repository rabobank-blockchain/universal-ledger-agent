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
import { ITransaction, Transaction } from '../../../src'

const testData: ITransaction = {
  uuid: '800aa58d-afdb-49eb-a5a2-fa4648d58b29',
  attestorPubKey: '0xfbe1505b99A1548523eCbf78699B08e4580624F9',
  datetime: new Date().toISOString(),
  attest: [],
  revoke: [],
  verifyRequest: []
  // state: 'string',
  // error: 'string'
}

describe('Transaction constructor', function () {
  it('should not accept empty attestorPubKey field', () => {
    let prep = Object.assign({}, testData)
    prep.attestorPubKey = ''

    const createSut = () => {
      return new Transaction(prep)
    }

    assert.throws(createSut, ReferenceError, 'One or more fields are empty')
  })

  it('should not accept empty datetime field', () => {
    let prep = Object.assign({}, testData)
    prep.datetime = ''

    const createSut = () => {
      return new Transaction(prep)
    }

    assert.throws(createSut, ReferenceError, 'One or more fields are empty')
  })

  it('should not throw on valid inputs', () => {
    let prep = Object.assign({}, testData)

    const createSut = () => {
      return new Transaction(prep)
    }

    createSut()
    assert.doesNotThrow(createSut)
  })

  it('should convert a JSON object to a Transaction class', () => {
    const sut1 = new Transaction(testData)
    const jsonObj = JSON.parse(JSON.stringify(sut1))
    let sut2 = new Transaction(jsonObj)
    assert.deepEqual(sut1, sut2)
  })

  it('should accept input without id', () => {
    delete testData.uuid

    let prep = Object.assign({}, testData)

    const createSut = () => {
      return new Transaction(prep)
    }

    createSut()
    assert.doesNotThrow(createSut)
  })

})
