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
import { Message } from '../../../src'

const testData = {
  type: 'typeOfMessage',
  canBeAnything: { 'any': 'thing' }
}

describe('Message constructor', function () {
  it('should not accept empty type field', () => {
    let prep = Object.assign({}, testData)
    prep.type = ''

    const createSut = () => {
      return new Message(prep)
    }

    assert.throws(createSut, ReferenceError, 'Type field is missing')
  })

  it('should not throw on valid inputs', () => {
    let prep = Object.assign({}, testData)

    const createSut = () => {
      return new Message(prep)
    }

    createSut()
    assert.doesNotThrow(createSut)
  })

  it('should convert a JSON object to a Proof class', () => {
    const sut1 = new Message(testData)
    const jsonObj = JSON.parse(JSON.stringify(sut1))
    const sut2 = new Message(jsonObj)

    assert.deepEqual(sut1, sut2)
  })

})
